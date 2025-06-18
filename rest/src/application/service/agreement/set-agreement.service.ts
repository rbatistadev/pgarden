import { Inject, Injectable } from '@nestjs/common';
import {
  AGREEMENT_REPOSITORY_INTERFACE,
  IAgreementRepository,
} from 'src/domain/model/agreement/agreement.repository';
import { Agreement } from 'src/domain/model/agreement/agreement.entity';

@Injectable()
export class SetAgreementService {
  constructor(
    @Inject(AGREEMENT_REPOSITORY_INTERFACE)
    private readonly agreementRepository: IAgreementRepository,
  ) {}

  async execute(
    companyId: string,
    dto: {
      vacationDays: number;
      medicalDays: number;
      deathDays: number;
      movingDays: number;
    },
  ) {
    const agreement = new Agreement(
      null,
      companyId,
      dto.vacationDays,
      dto.medicalDays,
      dto.deathDays,
      dto.movingDays,
    );
    return this.agreementRepository.upsert(agreement);
  }
}
