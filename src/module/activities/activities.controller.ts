import { Controller, Get, Inject } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { ActivitiesService } from './activities.service';

@Controller({ path: 'activities' })
export class ActivitiesController {
  constructor(
    @Inject(REQUEST) private request,
    private readonly activitiesService: ActivitiesService,
  ) {}

  @Get()
  findAll() {
    return this.activitiesService.findAll();
  }
}
