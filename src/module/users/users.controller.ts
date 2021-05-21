import {
  BadRequestException,
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
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user-dto';
import { Role } from '../auth/role.decorator';
import { UpdateUserDto } from './dto/update-user-dto';
import { REQUEST } from '@nestjs/core';
import { AuthService } from '../auth/auth.service';
import { ActivityDto } from '../activities/dto/activity.dto';
import { ActivitiesService } from '../activities/activities.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
    private readonly activitiesService: ActivitiesService,
    @Inject(REQUEST) private request,
  ) {}

  @Role('admin')
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const isEmailValid = await this.authService.isEmailValid(
      createUserDto.email,
    );
    if (!isEmailValid) {
      throw new BadRequestException('Email is already occupied');
    }
    const user = await this.usersService.create(createUserDto);
    await this.activitiesService.registerCreate(
      new ActivityDto('Usuario: ' + user.fullname, 'users', user),
    );
    return user;
  }

  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const user = await this.authService.findOne(id);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  @Role('admin')
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const isEmailValid = await this.authService.isEmailValid(
      updateUserDto.email,
      +id,
    );
    if (!isEmailValid) {
      throw new BadRequestException('Email is already occupied');
    }
    const user = await this.usersService.update(+id, updateUserDto);
    await this.activitiesService.registerUpdate(
      new ActivityDto('Usuario: ' + user.fullname, 'users', user),
    );
    return user;
  }

  @Role('admin')
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const user = await this.usersService.remove(+id);
    await this.activitiesService.registerDelete(
      new ActivityDto('Usuario: ' + user.fullname, 'users', user),
    );
    return user;
  }
}
