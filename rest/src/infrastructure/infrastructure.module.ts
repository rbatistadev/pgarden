import { Global, Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './service/auth/auth.module';
import { UserRepositoryModule } from './modules/user-repository.module';
import { CompanyRepositoryModule } from './modules/company-repository.module';
import { AttendanceRepositoryModule } from './modules/attendance-repository.module';
import { AgreementRepositoryModule } from './modules/agreement-repository.module';
import { AbsenceRepositoryModule } from './modules/absence-repository.module';

@Global()
@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UserRepositoryModule,
    CompanyRepositoryModule,
    AttendanceRepositoryModule,
    AgreementRepositoryModule,
    AbsenceRepositoryModule,
  ],
  exports: [
    AuthModule,
    UserRepositoryModule,
    CompanyRepositoryModule,
    AttendanceRepositoryModule,
    AgreementRepositoryModule,
    AbsenceRepositoryModule,
  ],
})
export class InfrastructureModule {}
