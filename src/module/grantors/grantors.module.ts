import { Module } from '@nestjs/common';
import { GrantorsService } from './grantors.service';
import { GrantorsController } from './grantors.controller';
import { ActivitiesModule } from '../activities/activities.module';

@Module({
  controllers: [GrantorsController],
  providers: [GrantorsService],
  exports: [GrantorsService],
  imports: [ActivitiesModule],
})
export class GrantorsModule {}
