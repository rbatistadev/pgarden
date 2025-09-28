import { Global, Module } from '@nestjs/common';
import { WorkSessionPrismaRepository } from '../prisma/repositories/work-session-prisma.repository';
import { WORK_SESSION_REPOSITORY_INTERFACE } from 'src/domain/model/work-session/work-session.repository';

@Global()
@Module({
  providers: [
    WorkSessionPrismaRepository,
    {
      provide: WORK_SESSION_REPOSITORY_INTERFACE,
      useClass: WorkSessionPrismaRepository,
    },
  ],
  exports: [WORK_SESSION_REPOSITORY_INTERFACE],
})
export class WorkSessionRepositoryModule {}
