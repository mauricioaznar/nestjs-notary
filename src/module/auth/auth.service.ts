import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';
import { Users } from '../../entity/Users';
import { JwtService } from '@nestjs/jwt';
import { GenerateResetTokenDto } from './dto/generate-reset-token-dto';
import { ChangePasswordDto } from './dto/change-password-dto';
import { Connection } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    protected _connection: Connection,
  ) {}

  async generateResetToken(generateResetTokenDto: GenerateResetTokenDto) {
    const reset_token = await this.jwtService.sign(
      { userId: generateResetTokenDto.userId },
      { secret: process.env.RESET_SECRET_KEY, expiresIn: 300 },
    );
    return { reset_token };
  }

  async createPasswordHashed(password: string) {
    return await bcrypt.hash(password, 8);
  }

  async isResetTokenValid(resetToken: string) {
    try {
      await this.jwtService.verify(resetToken, {
        secret: process.env.RESET_SECRET_KEY,
      });
      return { isValid: true };
    } catch (e) {
      return { isValid: false };
    }
  }

  async changePassword(
    resetToken: string,
    changePasswordDto: ChangePasswordDto,
  ) {
    const payload: any = await this.jwtService.decode(resetToken);
    const userId = parseInt(payload.userId);
    await this.updateUserPassword(userId, changePasswordDto.password);
    return await this.findOne(userId);
  }

  async updateUserPassword(id: number, newPassword: string) {
    const passwordHashed = await this.createPasswordHashed(newPassword);
    await this._connection
      .getRepository(Users)
      .createQueryBuilder()
      .update()
      .set({ password: passwordHashed, updatedAt: () => 'now()' })
      .where('id = :id', { id })
      .execute();
  }

  async findAll() {
    return await this._connection
      .getRepository(Users)
      .createQueryBuilder('users')
      .leftJoinAndSelect('users.groups', 'groups', 'users_groups.active = 1')
      .leftJoinAndSelect('users.role', 'roles', 'roles.active = 1')
      .where('users.active = 1')
      .orderBy('users.updatedAt', 'DESC')
      .getMany();
  }

  async findOne(id: number) {
    return await this._connection
      .getRepository(Users)
      .createQueryBuilder('users')
      .leftJoinAndSelect('users.groups', 'groups', 'users_groups.active = 1')
      .leftJoinAndSelect('users.role', 'roles', 'roles.active = 1')
      .where('users.active = 1')
      .andWhere('users.id = :id', { id })
      .getOne();
  }

  async findOneByEmail(email: string) {
    return await this._connection
      .getRepository(Users)
      .createQueryBuilder('users')
      .addSelect('users.password')
      .leftJoinAndSelect('users.groups', 'groups', 'users_groups.active = 1')
      .leftJoinAndSelect('users.role', 'roles', 'roles.active = 1')
      .where('users.active = 1')
      .andWhere('users.email = :email', { email })
      .getOne();
  }

  async isEmailValid(email: string, id?: number) {
    const user = await this.findOneByEmail(email);
    if (id) {
      if (!user) {
        //email is available
        return true;
      } else {
        // true if user is the same as the one requesting it
        return user.id === id;
      }
    } else {
      // is valid if the there is no one using that email
      return user === undefined;
    }
  }

  async validateUser(name: string, pass: string): Promise<any> {
    const user = await this.findOneByEmail(name);
    if (!user) {
      return null;
    }
    let storedPassword = user.password;
    if (user.password.match(/^\$2y(.+)$/i)) {
      storedPassword = user.password.replace(/^\$2y(.+)$/i, '$2a$1');
    }
    const isValidPassword = await bcrypt.compare(pass, storedPassword);
    if (!isValidPassword) {
      return null;
    }
    return user;
  }

  async login(user: Users) {
    const payload = { username: user.email, userId: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
