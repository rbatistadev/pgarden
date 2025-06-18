import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  AGREEMENT_REPOSITORY_INTERFACE,
  IAgreementRepository,
} from 'src/domain/model/agreement/agreement.repository';

@Injectable()
export class GetAgreementService {
  constructor(
    @Inject(AGREEMENT_REPOSITORY_INTERFACE)
    private readonly agreementRepository: IAgreementRepository,
  ) {}

  async execute(companyId: string) {
    const agreement = await this.agreementRepository.findByCompanyId(companyId);
    if (!agreement) throw new NotFoundException('Agreement not found');
    return agreement;
  }
}
