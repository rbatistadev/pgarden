import { Global, Module } from '@nestjs/common';
import { CompanyPrismaRepository } from '../prisma/repositories/company-prisma.repository';
import { COMPANY_REPOSITORY_INTERFACE } from 'src/domain/model/company/company.repository';

@Global()
@Module({
  providers: [
    CompanyPrismaRepository,
    {
      provide: COMPANY_REPOSITORY_INTERFACE,
      useClass: CompanyPrismaRepository,
    },
  ],
  exports: [COMPANY_REPOSITORY_INTERFACE],
})
export class CompanyRepositoryModule {}
