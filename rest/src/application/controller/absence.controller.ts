import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../service/auth/auth.guard';
import { RolesGuard } from '../service/rol/roles.guard';
import { Roles } from '../decorators/roles.decorator';
import { CurrentUser } from '../decorators/current-user.decorator';
import { RequestUser } from '../model/auth/auth.model';
import { RequestAbsenceService } from '../service/absence/request-absence.service';
import { ApproveAbsenceService } from '../service/absence/approve-absence.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { RequestAbsenceDto } from '../model/absence/request-absence.dto';

@ApiBearerAuth()
@Controller('absences')
@UseGuards(AuthGuard, RolesGuard)
export class AbsenceController {
  constructor(
    private readonly requestAbsenceService: RequestAbsenceService,
    private readonly approveAbsenceService: ApproveAbsenceService,
  ) {}

  @Post()
  @Roles('USER')
  request(@Body() dto: RequestAbsenceDto, @CurrentUser() user: RequestUser) {
    return this.requestAbsenceService.execute(
      {
        type: dto.type,
        startDate: new Date(dto.startDate),
        endDate: new Date(dto.endDate),
      },
      user,
    );
  }

  @Post(':id/approve')
  @Roles('MANAGER')
  approve(@Param('id') id: string) {
    return this.approveAbsenceService.execute(id);
  }
}
