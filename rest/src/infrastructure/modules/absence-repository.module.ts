import { Global, Module } from '@nestjs/common';
import { AbsencePrismaRepository } from '../prisma/repositories/absence-prisma.repository';
import { ABSENCE_REPOSITORY_INTERFACE } from 'src/domain/model/absence/absence.repository';

@Global()
@Module({
  providers: [
    AbsencePrismaRepository,
    {
      provide: ABSENCE_REPOSITORY_INTERFACE,
      useClass: AbsencePrismaRepository,
    },
  ],
  exports: [ABSENCE_REPOSITORY_INTERFACE],
})
export class AbsenceRepositoryModule {}
