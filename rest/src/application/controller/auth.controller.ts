import { Controller, Post, Body } from '@nestjs/common';
import { AuthLoginService } from '../service/auth/auth-login.service';
import { AuthRegisterService } from '../service/auth/auth-register.service';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { RegisterDto } from '../model/auth/register.dto';
import { LoginDto } from '../model/auth/login.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly registerService: AuthRegisterService,
    private readonly loginService: AuthLoginService,
  ) {}

  @Post('register')
  @ApiCreatedResponse({ type: RegisterDto })
  register(@Body() dto: RegisterDto) {
    return this.registerService.execute(dto);
  }

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.loginService.execute(dto);
  }
}
