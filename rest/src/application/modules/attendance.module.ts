import { Module } from '@nestjs/common';
import { AttendanceController } from '../controller/attendance.controller';
import { CheckInService } from '../service/attendance/check-in.service';
import { CheckOutService } from '../service/attendance/check-out.service';
@Module({
  controllers: [AttendanceController],
  providers: [CheckInService, CheckOutService],
})
export class AttendanceModule {}
