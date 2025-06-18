import { Module } from '@nestjs/common';
import { AuthController } from '../controller/auth.controller';
import { AuthLoginService } from '../service/auth/auth-login.service';
import { AuthRegisterService } from '../service/auth/auth-register.service';
@Module({
  controllers: [AuthController],
  providers: [AuthLoginService, AuthRegisterService],
})
export class AuthModule {}
