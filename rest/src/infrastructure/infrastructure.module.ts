import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UserPrismaRepository } from './prisma/repositories/user-prisma.repository';
import { CompanyPrismaRepository } from './prisma/repositories/company-prisma.repository';
import { USER_REPOSITORY_INTERFACE } from 'src/domain/user/user.repository';
import { COMPANY_REPOSITORY_INTERFACE } from 'src/domain/company/company.repository';
import { JwtModule } from '@nestjs/jwt';
import { JwtService } from './auth/jwt.service';
import { AUTH_INTERFACE } from 'src/application/auth/auth.interface';

@Module({
  imports: [PrismaModule, JwtModule.register({})],
  providers: [
    JwtService,
    {
      provide: AUTH_INTERFACE,
      useClass: JwtService,
    },
    UserPrismaRepository,
    CompanyPrismaRepository,
    {
      provide: USER_REPOSITORY_INTERFACE,
      useClass: UserPrismaRepository,
    },
    {
      provide: COMPANY_REPOSITORY_INTERFACE,
      useClass: CompanyPrismaRepository,
    },
  ],
  exports: [
    UserPrismaRepository,
    AUTH_INTERFACE,
    USER_REPOSITORY_INTERFACE,
    COMPANY_REPOSITORY_INTERFACE,
  ],
})
export class InfrastructureModule {}
