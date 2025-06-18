import { Global, Module } from '@nestjs/common';
import { AgreementPrismaRepository } from '../prisma/repositories/agreement-prisma.repository';
import { AGREEMENT_REPOSITORY_INTERFACE } from 'src/domain/model/agreement/agreement.repository';

@Global()
@Module({
  providers: [
    AgreementPrismaRepository,
    {
      provide: AGREEMENT_REPOSITORY_INTERFACE,
      useClass: AgreementPrismaRepository,
    },
  ],
  exports: [AGREEMENT_REPOSITORY_INTERFACE],
})
export class AgreementRepositoryModule {}
