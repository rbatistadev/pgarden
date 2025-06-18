import { Agreement } from './agreement.entity';

export const AGREEMENT_REPOSITORY_INTERFACE = Symbol('IAgreementRepository');
export interface IAgreementRepository {
  upsert(agreement: Agreement): Promise<Agreement>;
  findByCompanyId(companyId: string): Promise<Agreement | null>;
  deleteByCompanyId(companyId: string): Promise<void>;
}
