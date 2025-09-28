import { Module } from '@nestjs/common';
import { DomainModule } from '../domain/domain.module';
import { AuthModule } from './modules/auth.module';
import { UserModule } from './modules/user.module';
import { WorkSessionModule } from './modules/work-session.module';
import { AbsenceModule } from './modules/absence.module';
import { AgreementModule } from './modules/agreement.module';

@Module({
  imports: [
    DomainModule,
    AuthModule,
    UserModule,
    WorkSessionModule,
    AbsenceModule,
    AgreementModule,
  ],
})
export class ApplicationModule {}
