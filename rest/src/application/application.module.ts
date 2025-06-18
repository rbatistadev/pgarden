import { Module } from '@nestjs/common';
import { DomainModule } from '../domain/domain.module';
import { AuthModule } from './modules/auth.module';
import { UserModule } from './modules/user.module';
import { AttendanceModule } from './modules/attendance.module';
import { AbsenceModule } from './modules/absence.module';
import { AgreementModule } from './modules/agreement.module';

@Module({
  imports: [
    DomainModule,
    AuthModule,
    UserModule,
    AttendanceModule,
    AbsenceModule,
    AgreementModule,
  ],
})
export class ApplicationModule {}
