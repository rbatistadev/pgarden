import { Body, Controller, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../service/auth/auth.guard';
import { RolesGuard } from '../service/rol/roles.guard';
import { Roles } from '../decorators/roles.decorator';
import { CurrentUser } from '../decorators/current-user.decorator';
import { RequestUser } from '../model/auth/auth.model';
import { SetAgreementService } from '../service/agreement/set-agreement.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { SetAgreementDto } from '../model/agreement/set-agreement.dto';

@ApiBearerAuth()
@Controller('agreements')
@UseGuards(AuthGuard, RolesGuard)
export class AgreementController {
  constructor(private readonly setAgreementService: SetAgreementService) {}

  @Put()
  @Roles('MANAGER')
  set(
    @Body() dto: SetAgreementDto,
    @CurrentUser() user: RequestUser,
  ) {
    return this.setAgreementService.execute(user.companyId, dto);
  }
}
