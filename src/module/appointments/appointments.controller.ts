import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { AppointmentDto } from './dto/appointment.dto';
import { FindAllAppointmentDto } from './dto/find-all-appointment-dto';
import { User } from '../common/decorator/user-decorator';
import { ActivitiesService } from '../activities/activities.service';
import { ActivityDto } from '../activities/dto/activity.dto';

@Controller('appointments')
export class AppointmentsController {
  constructor(
    private readonly appointmentsService: AppointmentsService,
    private readonly activitiesService: ActivitiesService,
  ) {}
  private APPOINTMENT_OCCUPIED_ERROR_MESSAGE =
    'No hay espacio disponible en las fechas seleccionadas.';

  @Post()
  async create(@Body() appointmentDto: AppointmentDto, @User() user) {
    const isValid = await this.appointmentsService.isDateRangeValid(
      appointmentDto.startDate,
      appointmentDto.endDate,
      appointmentDto.roomId,
    );
    if (!isValid) {
      throw new BadRequestException(this.APPOINTMENT_OCCUPIED_ERROR_MESSAGE);
    }
    const appointment = await this.appointmentsService.create(
      appointmentDto,
      user,
    );
    await this.activitiesService.registerCreate(
      new ActivityDto('Cita: ' + appointment.name, 'appointments', appointment),
    );
    return appointment;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() appointmentDto: AppointmentDto,
    @User() user,
  ) {
    const isValid = await this.appointmentsService.isDateRangeValid(
      appointmentDto.startDate,
      appointmentDto.endDate,
      appointmentDto.roomId,
      id,
    );
    if (!isValid) {
      throw new BadRequestException(this.APPOINTMENT_OCCUPIED_ERROR_MESSAGE);
    }
    const oldAppointment = await this.appointmentsService.findOne(+id);
    const canUserUpdate = await this.appointmentsService.canUserUpdate(
      oldAppointment,
      user,
    );
    if (!canUserUpdate) {
      throw new ForbiddenException();
    }
    const appointment = await this.appointmentsService.update(
      +id,
      appointmentDto,
    );
    await this.activitiesService.registerUpdate(
      new ActivityDto('Cita: ' + appointment.name, 'appointments', appointment),
    );
    return appointment;
  }

  @Get()
  async findAll(@Query() params: FindAllAppointmentDto, @User() user) {
    const appointments = await this.appointmentsService.findAll(
      params.startDate,
    );
    return await Promise.all(
      await appointments.map(async (appointment) => {
        return {
          ...appointment,
          editable: await this.appointmentsService.canUserUpdate(
            appointment,
            user,
          ),
        };
      }),
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @User() user) {
    const appointment = await this.appointmentsService.findOne(+id);
    if (!appointment) {
      throw new NotFoundException();
    }
    const canUserUpdate = await this.appointmentsService.canUserUpdate(
      appointment,
      user,
    );
    return { ...appointment, editable: canUserUpdate };
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @User() user) {
    const oldAppointment = await this.appointmentsService.findOne(+id);
    if (!oldAppointment) {
      throw new NotFoundException();
    }
    const canUserUpdate = await this.appointmentsService.canUserUpdate(
      oldAppointment,
      user,
    );
    if (!canUserUpdate) {
      throw new ForbiddenException();
    }

    const appointment = await this.appointmentsService.remove(+id);
    await this.activitiesService.registerDelete(
      new ActivityDto('Cita: ' + appointment.name, 'appointments', appointment),
    );
    return appointment;
  }
}
