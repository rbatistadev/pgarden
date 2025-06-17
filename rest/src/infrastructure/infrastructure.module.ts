import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UserPrismaRepository } from './prisma/repositories/user-prisma.repository';
import { CompanyPrismaRepository } from './prisma/repositories/company-prisma.repository';
import { USER_REPOSITORY_INTERFACE } from 'src/domain/model/user/user.repository.interface';
import { COMPANY_REPOSITORY_INTERFACE } from 'src/domain/model/company/company.repository';
import { JwtModule } from '@nestjs/jwt';
import { JwtService } from './service/auth/jwt.service';
import { AUTH_INTERFACE } from 'src/application/model/auth/auth.interface';
import { JwtStrategy } from './service/auth/jwt.strategy';
import { AttendancePrismaRepository } from './prisma/repositories/attendance-prisma.repository';
import { ATTENDANCE_REPOSITORY_INTERFACE } from 'src/domain/model/attendance/attendance.repository';
import { AgreementPrismaRepository } from './prisma/repositories/agreement-prisma.repository';
import { AbsencePrismaRepository } from './prisma/repositories/absence-prisma.repository';
import { AGREEMENT_REPOSITORY_INTERFACE } from 'src/domain/model/agreement/agreement.repository';
import { ABSENCE_REPOSITORY_INTERFACE } from 'src/domain/model/absence/absence.repository';

@Module({
  imports: [PrismaModule, JwtModule.register({})],
  providers: [
    JwtService,
    JwtStrategy,
    {
      provide: AUTH_INTERFACE,
      useClass: JwtService,
    },
    UserPrismaRepository,
    CompanyPrismaRepository,
    AttendancePrismaRepository,
    AgreementPrismaRepository,
    AbsencePrismaRepository,
    {
      provide: USER_REPOSITORY_INTERFACE,
      useClass: UserPrismaRepository,
    },
    {
      provide: COMPANY_REPOSITORY_INTERFACE,
      useClass: CompanyPrismaRepository,
    },
    {
      provide: ATTENDANCE_REPOSITORY_INTERFACE,
      useClass: AttendancePrismaRepository,
    },
    {
      provide: AGREEMENT_REPOSITORY_INTERFACE,
      useClass: AgreementPrismaRepository,
    },
    {
      provide: ABSENCE_REPOSITORY_INTERFACE,
      useClass: AbsencePrismaRepository,
    },
  ],
  exports: [
    UserPrismaRepository,
    AUTH_INTERFACE,
    USER_REPOSITORY_INTERFACE,
    COMPANY_REPOSITORY_INTERFACE,
    ATTENDANCE_REPOSITORY_INTERFACE,
    AGREEMENT_REPOSITORY_INTERFACE,
    ABSENCE_REPOSITORY_INTERFACE,
  ],
})
export class InfrastructureModule {}
