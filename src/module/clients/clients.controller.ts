import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ClientDto } from './dto/client.dto';
import { Public } from '../auth/public.decorator';
import { PaginationQueryParamsDto } from '../common/dto/pagination-query-params-dto';
import { ActivitiesService } from '../activities/activities.service';
import { ActivityDto } from '../activities/dto/activity.dto';

@Controller('clients')
export class ClientsController {
  constructor(
    private readonly clientsService: ClientsService,
    private readonly activitiesService: ActivitiesService,
  ) {}

  @Post()
  async create(@Body() clientDto: ClientDto) {
    const client = await this.clientsService.create(clientDto);
    await this.activitiesService.registerCreate(
      new ActivityDto('Cliente: ' + client.fullname, 'clients', client),
    );
    return client;
  }

  @Get()
  findAll() {
    return this.clientsService.findAll();
  }

  @Get('pagination')
  paginate(@Query() paginationParamsDto: PaginationQueryParamsDto) {
    return this.clientsService.paginate(paginationParamsDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const client = await this.clientsService.findOne(+id);
    if (!client) {
      throw new NotFoundException();
    }
    return client;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() clientDto: ClientDto) {
    const client = await this.clientsService.update(+id, clientDto);
    await this.activitiesService.registerUpdate(
      new ActivityDto('Cliente: ' + client.fullname, 'clients', client),
    );
    return client;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const client = await this.clientsService.remove(+id);
    await this.activitiesService.registerDelete(
      new ActivityDto('Cliente: ' + client.fullname, 'clients', client),
    );
    return client;
  }
}
