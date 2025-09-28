import { Module } from '@nestjs/common';
import { CheckInService } from '../service/attendance/check-in.service';
import { CheckOutService } from '../service/attendance/check-out.service';
import { WorkSessionController } from '../controller/work-session.controller';
@Module({
  controllers: [WorkSessionController],
  providers: [CheckInService, CheckOutService],
})
export class WorkSessionModule {}
