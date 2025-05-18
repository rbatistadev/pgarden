import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UserPrismaRepository } from './prisma/repositories/user-prisma.repository';
import { CompanyPrismaRepository } from './prisma/repositories/company-prisma.repository';
import { IUserRepository } from 'src/domain/user/user.repository';
import { ICompanyRepository } from 'src/domain/company/company.repository';

@Module({
  imports: [PrismaModule],
  providers: [
    UserPrismaRepository,
    CompanyPrismaRepository,
    {
      provide: IUserRepository,
      useClass: UserPrismaRepository,
    },
    {
      provide: ICompanyRepository,
      useClass: CompanyPrismaRepository,
    },
  ],
  exports: [UserPrismaRepository, IUserRepository, ICompanyRepository],
})
export class InfrastructureModule {}
