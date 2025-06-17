import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { RequestUser } from '../../model/auth/auth.model';
import { AbsenceType } from 'src/domain/model/absence/absence-type';
import { Absence } from 'src/domain/model/absence/absence.entity';
import { ABSENCE_REPOSITORY_INTERFACE, IAbsenceRepository } from 'src/domain/model/absence/absence.repository';
import { AGREEMENT_REPOSITORY_INTERFACE, IAgreementRepository } from 'src/domain/model/agreement/agreement.repository';

@Injectable()
export class RequestAbsenceService {
  constructor(
    @Inject(ABSENCE_REPOSITORY_INTERFACE)
    private readonly absenceRepository: IAbsenceRepository,
    @Inject(AGREEMENT_REPOSITORY_INTERFACE)
    private readonly agreementRepository: IAgreementRepository,
  ) {}

  async execute(
    dto: { type: AbsenceType; startDate: Date; endDate: Date },
    currentUser: RequestUser,
  ) {
    if (dto.startDate > dto.endDate) {
      throw new BadRequestException('Invalid date range');
    }

    const agreement = await this.agreementRepository.findByCompanyId(currentUser.companyId);
    if (!agreement) {
      throw new BadRequestException('Agreement not configured');
    }

    const daysRequested = this.calculateDays(dto.startDate, dto.endDate);
    const used = await this.absenceRepository.countApprovedDaysByUserAndType(
      currentUser.userId!,
      dto.type,
    );

    const allowed = this.getAllowedDays(agreement, dto.type);
    if (used + daysRequested > allowed) {
      throw new BadRequestException('Not enough days available');
    }

    const absence = new Absence(
      null,
      currentUser.userId!,
      dto.type,
      dto.startDate,
      dto.endDate,
      daysRequested,
      false,
    );
    return this.absenceRepository.create(absence);
  }

  private calculateDays(start: Date, end: Date): number {
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.floor((end.getTime() - start.getTime()) / oneDay) + 1;
  }

  private getAllowedDays(agreement: any, type: AbsenceType): number {
    switch (type) {
      case 'VACATION':
        return agreement.vacationDays;
      case 'MEDICAL':
        return agreement.medicalDays;
      case 'DEATH':
        return agreement.deathDays;
      case 'MOVING':
        return agreement.movingDays;
    }
  }
}
