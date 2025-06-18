import { Module } from '@nestjs/common';
import { AbsenceController } from '../controller/absence.controller';
import { RequestAbsenceService } from '../service/absence/request-absence.service';
import { ApproveAbsenceService } from '../service/absence/approve-absence.service';
@Module({
  controllers: [AbsenceController],
  providers: [RequestAbsenceService, ApproveAbsenceService],
})
export class AbsenceModule {}
