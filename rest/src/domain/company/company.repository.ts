import { Company } from './company.entity';

export abstract class ICompanyRepository {
  abstract save(company: Company): Promise<Company>;
  abstract findByName(name: string): Promise<Company | null>;
  abstract findById(id: string): Promise<Company | null>;
}
