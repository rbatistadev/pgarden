import { Inject, Injectable } from '@nestjs/common';
import { AGREEMENT_REPOSITORY_INTERFACE, IAgreementRepository } from 'src/domain/model/agreement/agreement.repository';

@Injectable()
export class DeleteAgreementService {
  constructor(
    @Inject(AGREEMENT_REPOSITORY_INTERFACE)
    private readonly agreementRepository: IAgreementRepository,
  ) {}

  async execute(companyId: string) {
    await this.agreementRepository.deleteByCompanyId(companyId);
  }
}
