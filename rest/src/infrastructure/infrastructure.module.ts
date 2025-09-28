import { Global, Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './service/auth/auth.module';
import { UserRepositoryModule } from './modules/user-repository.module';
import { CompanyRepositoryModule } from './modules/company-repository.module';
import { WorkSessionRepositoryModule } from './modules/work-session-repository.module';
import { AgreementRepositoryModule } from './modules/agreement-repository.module';
import { AbsenceRepositoryModule } from './modules/absence-repository.module';

@Global()
@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UserRepositoryModule,
    CompanyRepositoryModule,
    WorkSessionRepositoryModule,
    AgreementRepositoryModule,
    AbsenceRepositoryModule,
  ],
  exports: [
    AuthModule,
    UserRepositoryModule,
    CompanyRepositoryModule,
    WorkSessionRepositoryModule,
    AgreementRepositoryModule,
    AbsenceRepositoryModule,
  ],
})
export class InfrastructureModule {}
