import { Global, Module } from '@nestjs/common';
import { AttendancePrismaRepository } from '../prisma/repositories/attendance-prisma.repository';
import { ATTENDANCE_REPOSITORY_INTERFACE } from 'src/domain/model/attendance/attendance.repository';

@Global()
@Module({
  providers: [
    AttendancePrismaRepository,
    {
      provide: ATTENDANCE_REPOSITORY_INTERFACE,
      useClass: AttendancePrismaRepository,
    },
  ],
  exports: [ATTENDANCE_REPOSITORY_INTERFACE],
})
export class AttendanceRepositoryModule {}
