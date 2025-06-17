import { Absence } from './absence.entity';
import { AbsenceType } from './absence-type';

export const ABSENCE_REPOSITORY_INTERFACE = Symbol('IAbsenceRepository');
export interface IAbsenceRepository {
  create(absence: Absence): Promise<Absence>;
  findById(id: string): Promise<Absence | null>;
  approve(id: string): Promise<Absence>;
  countApprovedDaysByUserAndType(userId: string, type: AbsenceType): Promise<number>;
}
