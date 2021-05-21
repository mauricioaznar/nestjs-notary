import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './public.decorator';
import { GenerateResetTokenDto } from './dto/generate-reset-token-dto';
import { Role } from './role.decorator';
import { LocalAuthGuard } from './local-auth.guard';
import { ChangePasswordDto } from './dto/change-password-dto';
import { AuthGateway } from '../common/gateway/AuthGateway';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly authGateway: AuthGateway,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Public()
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Role('admin')
  @Post('generate_reset_token')
  generateResetToken(@Body() generateResetTokenDto: GenerateResetTokenDto) {
    return this.authService.generateResetToken(generateResetTokenDto);
  }

  @Public()
  @Get('validate_reset_token/:resetToken')
  validateResetToken(@Param() { resetToken }) {
    return this.authService.isResetTokenValid(resetToken);
  }

  @Get('logout')
  logout() {
    this.authGateway.disconnect();
  }

  @Public()
  @Post('change_password/:resetToken')
  async changePassword(
    @Param() { resetToken },
    @Body() changePasswordDto: ChangePasswordDto,
  ) {
    const isValid = await this.authService.isResetTokenValid(resetToken);
    if (!isValid) {
      throw new BadRequestException();
    }
    return this.authService.changePassword(resetToken, changePasswordDto);
  }
}
