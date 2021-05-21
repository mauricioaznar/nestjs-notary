import { Module } from '@nestjs/common';
import { ActivitiesService } from './activities.service';
import { AuthGateway } from '../common/gateway/AuthGateway';
import { ActivitiesController } from './activities.controller';

@Module({
  providers: [ActivitiesService, AuthGateway],
  exports: [ActivitiesService],
  controllers: [ActivitiesController],
})
export class ActivitiesModule {}
