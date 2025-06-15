import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { ATTENDANCE_REPOSITORY_INTERFACE, IAttendanceRepository } from 'src/domain/model/attendance/attendance.repository';
import { Attendance } from 'src/domain/model/attendance/attendance.entity';
import { RequestUser } from 'src/application/model/auth/auth.model';

@Injectable()
export class CheckInService {
  constructor(
    @Inject(ATTENDANCE_REPOSITORY_INTERFACE)
    private readonly attendanceRepository: IAttendanceRepository,
  ) {}

  async execute(currentUser: RequestUser): Promise<Attendance> {
    const open = await this.attendanceRepository.findOpenByUserId(currentUser.userId!);
    if (open) {
      throw new ConflictException('User already checked in');
    }
    const attendance = new Attendance(null, currentUser.userId!, new Date(), null);
    return this.attendanceRepository.create(attendance);
  }
}
