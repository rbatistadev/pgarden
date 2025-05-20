import { Company } from './company.entity';

export const COMPANY_REPOSITORY_INTERFACE = Symbol('ICompanyRepository');

export interface ICompanyRepository {
  save(company: Company): Promise<Company>;
  findByName(name: string): Promise<Company | null>;
  findById(id: string): Promise<Company | null>;
}
