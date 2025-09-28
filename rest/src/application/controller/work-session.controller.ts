import { Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../service/auth/auth.guard';
import { RolesGuard } from '../service/rol/roles.guard';
import { Roles } from '../decorators/roles.decorator';
import { CurrentUser } from '../decorators/current-user.decorator';
import { RequestUser } from '../model/auth/auth.model';
import { CheckInService } from '../service/attendance/check-in.service';
import { CheckOutService } from '../service/attendance/check-out.service';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('sessions')
@UseGuards(AuthGuard, RolesGuard)
export class WorkSessionController {
  constructor(
    private readonly checkInService: CheckInService,
    private readonly checkOutService: CheckOutService,
  ) {}

  @Post('start')
  @Roles('USER')
  checkIn(@CurrentUser() user: RequestUser) {
    return this.checkInService.execute(user);
  }

  @Post('stop')
  @Roles('USER')
  checkOut(@CurrentUser() user: RequestUser) {
    return this.checkOutService.execute(user);
  }
}
