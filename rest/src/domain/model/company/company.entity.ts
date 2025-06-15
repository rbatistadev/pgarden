import { BaseEntity } from '../base.entity.abstract';

export class Company extends BaseEntity {
  constructor(
    public readonly id: string | null,
    public readonly name: string,
  ) {
    super(id);
  }
}
