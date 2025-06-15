import { forwardRef, Module } from '@nestjs/common';
import { CreateUserService } from './service/user/create-user.service';
import { DomainModule } from '../domain/domain.module';
import { InfrastructureModule } from 'src/infrastructure/infrastructure.module';
import { AuthController } from './controller/auth.controller';
import { AuthLoginService } from './service/auth/auth-login.service';
import { AuthRegisterService } from './service/auth/auth-register.service';
import { UserController } from './controller/user.controller';
import { AttendanceController } from './controller/attendance.controller';
import { CheckInService } from './service/attendance/check-in.service';
import { CheckOutService } from './service/attendance/check-out.service';

@Module({
  imports: [forwardRef(() => DomainModule), InfrastructureModule],
  controllers: [UserController, AuthController, AttendanceController],
  providers: [
    CreateUserService,
    AuthLoginService,
    AuthRegisterService,
    CheckInService,
    CheckOutService,
  ],
})
export class ApplicationModule {}
