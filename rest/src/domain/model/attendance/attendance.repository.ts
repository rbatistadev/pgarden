import { Attendance } from './attendance.entity';

export const ATTENDANCE_REPOSITORY_INTERFACE = Symbol('IAttendanceRepository');

export interface IAttendanceRepository {
  create(attendance: Attendance): Promise<Attendance>;
  findOpenByUserId(userId: string): Promise<Attendance | null>;
  update(attendance: Attendance): Promise<Attendance>;
}
