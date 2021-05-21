import { Controller, Get, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './module/auth/auth.service';
import { ClientsService } from './module/clients/clients.service';
import { UsersService } from './module/users/users.service';
import { GrantorsService } from './module/grantors/grantors.service';
import { GroupsService } from './module/groups/groups.service';
import { AuthGateway } from './module/common/gateway/AuthGateway';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
    private readonly authGateway: AuthGateway,
    private clientsService: ClientsService,
    private usersService: UsersService,
    private grantorsService: GrantorsService,
    private groupsService: GroupsService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('profile')
  getProfile(@Request() req) {
    this.authGateway.joinAuth();
    return this.authService.findOne(req.user.id);
  }

  @Get('statics')
  async getStatics(@Request() req) {
    const clients = await this.clientsService.findAll();
    const grantors = await this.grantorsService.findAll();
    const users = await this.authService.findAll();
    const groups = await this.groupsService.findAll();
    const {
      roles,
      rooms,
      documentStatuses,
      documentTypes,
      documentOperations,
      documentAttachments,
    } = await this.appService.getStatics();
    return {
      rooms,
      clients,
      users,
      grantors,
      groups,
      roles,
      documentStatuses,
      documentTypes,
      documentOperations,
      documentAttachments,
    };
  }
}
