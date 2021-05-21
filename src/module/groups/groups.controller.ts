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
} from '@nestjs/common';
import { GroupsService } from './groups.service';
import { GroupDto } from './dto/group-dto';
import { Role } from '../auth/role.decorator';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { ActivitiesService } from '../activities/activities.service';
import { ActivityDto } from '../activities/dto/activity.dto';

@Controller('groups')
export class GroupsController {
  constructor(
    @Inject(REQUEST) request: Request,
    private readonly activitiesService: ActivitiesService,
    private readonly groupsService: GroupsService,
  ) {}

  @Role('admin')
  @Post()
  async create(@Body() groupDto: GroupDto) {
    const group = await this.groupsService.create(groupDto);
    await this.activitiesService.registerCreate(
      new ActivityDto('Grupo: ' + group.name, 'groups', group),
    );
    return group;
  }

  @Get()
  findAll() {
    return this.groupsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const group = await this.groupsService.findOne(+id);
    if (!group) {
      throw new NotFoundException();
    }
    return group;
  }

  @Role('admin')
  @Patch(':id')
  async update(@Param('id') id: string, @Body() groupDto: GroupDto) {
    const group = await this.groupsService.update(+id, groupDto);
    await this.activitiesService.registerUpdate(
      new ActivityDto('Grupo: ' + group.name, 'groups', group),
    );
    return group;
  }

  @Role('admin')
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const group = await this.groupsService.remove(+id);
    await this.activitiesService.registerDelete(
      new ActivityDto('Grupo: ' + group.name, 'groups', group),
    );
    return group;
  }
}
