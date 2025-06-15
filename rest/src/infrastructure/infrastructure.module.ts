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
  ],
  exports: [
    UserPrismaRepository,
    AUTH_INTERFACE,
    USER_REPOSITORY_INTERFACE,
    COMPANY_REPOSITORY_INTERFACE,
    ATTENDANCE_REPOSITORY_INTERFACE,
  ],
})
export class InfrastructureModule {}
