import { forwardRef, Module } from '@nestjs/common';
import { CreateUserService } from './service/user/create-user.service';
import { DomainModule } from '../domain/domain.module';
import { InfrastructureModule } from 'src/infrastructure/infrastructure.module';
import { AuthController } from './controller/auth.controller';
import { AuthLoginService } from './service/auth/auth-login.service';
import { AuthRegisterService } from './service/auth/auth-register.service';
import { UserController } from './controller/user.controller';
import { AttendanceController } from './controller/attendance.controller';
import { AbsenceController } from './controller/absence.controller';
import { AgreementController } from './controller/agreement.controller';
import { CheckInService } from './service/attendance/check-in.service';
import { CheckOutService } from './service/attendance/check-out.service';
import { RequestAbsenceService } from './service/absence/request-absence.service';
import { ApproveAbsenceService } from './service/absence/approve-absence.service';
import { SetAgreementService } from './service/agreement/set-agreement.service';
import { GetAgreementService } from './service/agreement/get-agreement.service';
import { DeleteAgreementService } from './service/agreement/delete-agreement.service';

@Module({
  imports: [forwardRef(() => DomainModule), InfrastructureModule],
  controllers: [
    UserController,
    AuthController,
    AttendanceController,
    AbsenceController,
    AgreementController,
  ],
  providers: [
    CreateUserService,
    AuthLoginService,
    AuthRegisterService,
    CheckInService,
    CheckOutService,
    RequestAbsenceService,
    ApproveAbsenceService,
    SetAgreementService,
    GetAgreementService,
    DeleteAgreementService,
  ],
})
export class ApplicationModule {}
