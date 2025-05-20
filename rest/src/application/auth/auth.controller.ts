import { Controller, Post, Body } from '@nestjs/common';
import { AuthLoginService } from './auth-login.service';
import { AuthRegisterService } from './auth-register.service';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { RegisterDto } from './dto/register.dto';

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
  login(@Body() dto: { email: string; password: string }) {
    return this.loginService.execute(dto);
  }
}
