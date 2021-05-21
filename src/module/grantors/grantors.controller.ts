import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { GrantorsService } from './grantors.service';
import { PaginationQueryParamsDto } from '../common/dto/pagination-query-params-dto';
import { GrantorDto } from './dto/grantor.dto';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { ActivitiesService } from '../activities/activities.service';
import { ActivityDto } from '../activities/dto/activity.dto';

@Controller('grantors')
export class GrantorsController {
  constructor(
    private readonly grantorsService: GrantorsService,
    private readonly activitiesService: ActivitiesService,
    @Inject(REQUEST) request: Request,
  ) {}

  @Post()
  async create(@Body() grantorDto: GrantorDto) {
    const grantor = await this.grantorsService.create(grantorDto);
    await this.activitiesService.registerCreate(
      new ActivityDto('Otorgante: ' + grantor.fullname, 'grantors', grantor),
    );
    return grantor;
  }

  @Get()
  findAll() {
    return this.grantorsService.findAll();
  }

  @Get('pagination')
  paginate(@Query() paginationParamsDto: PaginationQueryParamsDto) {
    return this.grantorsService.paginate(paginationParamsDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const grantor = await this.grantorsService.findOne(+id);
    if (!grantor) {
      throw new NotFoundException();
    }
    return grantor;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() grantorDto: GrantorDto) {
    const grantor = await this.grantorsService.update(+id, grantorDto);
    await this.activitiesService.registerUpdate(
      new ActivityDto('Otorgante: ' + grantor.fullname, 'grantors', grantor),
    );
    return grantor;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const grantor = await this.grantorsService.remove(+id);
    await this.activitiesService.registerDelete(
      new ActivityDto('Otorgante: ' + grantor.fullname, 'grantors', grantor),
    );
    return grantor;
  }
}
