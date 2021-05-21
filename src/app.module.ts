import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ConnectionOptions } from 'typeorm';
import { APP_GUARD } from '@nestjs/core';

import { AppController } from './app.controller';
import { AuthModule } from './module/auth/auth.module';
import { AppService } from './app.service';
import { UsersModule } from './module/users/users.module';
import { RolesGuard } from './module/auth/role.guard';
import { JwtAuthGuard } from './module/auth/jwt-auth.guard';
import { AppointmentsModule } from './module/appointments/appointments.module';
import { ClientsModule } from './module/clients/clients.module';
import { GrantorsModule } from './module/grantors/grantors.module';
import { GroupsModule } from './module/groups/groups.module';
import { DocumentsModule } from './module/documents/documents.module';
import { IsDateAfterConstraint } from './module/common/validator/is-date-after';
import { IsDateTimeStringConstraint } from './module/common/validator/is-date-time-string-constraint';
import { IsEntityActiveConstraint } from './module/common/validator/is-entity-active-constraint';
import { AreEntitiesActiveConstraint } from './module/common/validator/are-entities-active-constraint';
import { ActivitiesModule } from './module/activities/activities.module';
import { AuthGateway } from './module/common/gateway/AuthGateway';

export const typeOrmCliOptions = {
  migrations: ['src/migration/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/migration',
  },
};

if (!process.env.USER) {
  throw new Error('process.env.USER is not defined');
}

if (!process.env.DB) {
  throw new Error('process.env.DB is not defined');
}

if (!process.env.PASSWORD) {
  throw new Error('process.env.PASSWORD is not defined');
}

if (!process.env.JWT_SECRET_KEY) {
  throw new Error('process.env.JWT_SECRET_KEY is not defined');
}

if (!process.env.RESET_SECRET_KEY) {
  throw new Error('process.env.RESET_SECRET_KEY is not defined');
}

const ENV = process.env.NODE_ENV;

export const connectionOptions: ConnectionOptions = {
  database: process.env.DB,
  username: process.env.USER,
  password: process.env.PASSWORD,
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  // entities: [join(__dirname, 'entity/*{.ts,.js}')],
  // dont change this value to true. Otherwise orm makes automatic changes to database
  synchronize: false,
  entities: ENV !== 'test' ? ['dist/entity/**/*.js'] : ['src/entity/**/*.ts'],
  logging: false,
  logger: 'advanced-console',
};

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => {
        return {
          ...connectionOptions,
          keepConnectionAlive: ENV === 'test',
        };
      },
    }),
    UsersModule,
    AuthModule,
    AppointmentsModule,
    ClientsModule,
    GrantorsModule,
    GroupsModule,
    DocumentsModule,
    ActivitiesModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    AuthGateway,
    IsDateAfterConstraint,
    IsDateTimeStringConstraint,
    IsEntityActiveConstraint,
    AreEntitiesActiveConstraint,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
