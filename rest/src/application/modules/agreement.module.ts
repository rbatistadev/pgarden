import { Module } from '@nestjs/common';
import { AgreementController } from '../controller/agreement.controller';
import { SetAgreementService } from '../service/agreement/set-agreement.service';
import { GetAgreementService } from '../service/agreement/get-agreement.service';
import { DeleteAgreementService } from '../service/agreement/delete-agreement.service';
@Module({
  controllers: [AgreementController],
  providers: [SetAgreementService, GetAgreementService, DeleteAgreementService],
})
export class AgreementModule {}
