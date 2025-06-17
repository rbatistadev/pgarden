import { Body, Controller, Delete, Get, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../service/auth/auth.guard';
import { RolesGuard } from '../service/rol/roles.guard';
import { Roles } from '../decorators/roles.decorator';
import { CurrentUser } from '../decorators/current-user.decorator';
import { RequestUser } from '../model/auth/auth.model';
import { SetAgreementService } from '../service/agreement/set-agreement.service';
import { GetAgreementService } from '../service/agreement/get-agreement.service';
import { DeleteAgreementService } from '../service/agreement/delete-agreement.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { SetAgreementDto } from '../model/agreement/set-agreement.dto';

@ApiBearerAuth()
@Controller('agreements')
@UseGuards(AuthGuard, RolesGuard)
export class AgreementController {
  constructor(
    private readonly setAgreementService: SetAgreementService,
    private readonly getAgreementService: GetAgreementService,
    private readonly deleteAgreementService: DeleteAgreementService,
  ) {}

  @Put()
  @Roles('MANAGER')
  set(
    @Body() dto: SetAgreementDto,
    @CurrentUser() user: RequestUser,
  ) {
    return this.setAgreementService.execute(user.companyId, dto);
  }

  @Get()
  @Roles('MANAGER')
  get(@CurrentUser() user: RequestUser) {
    return this.getAgreementService.execute(user.companyId);
  }

  @Post()
  @Roles('MANAGER')
  create(
    @Body() dto: SetAgreementDto,
    @CurrentUser() user: RequestUser,
  ) {
    return this.setAgreementService.execute(user.companyId, dto);
  }

  @Delete()
  @Roles('MANAGER')
  remove(@CurrentUser() user: RequestUser) {
    return this.deleteAgreementService.execute(user.companyId);
  }
}
