import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Min } from 'class-validator';

export class SetAgreementDto {
  @ApiProperty()
  @IsInt()
  @Min(0)
  vacationDays: number;

  @ApiProperty()
  @IsInt()
  @Min(0)
  medicalDays: number;

  @ApiProperty()
  @IsInt()
  @Min(0)
  deathDays: number;

  @ApiProperty()
  @IsInt()
  @Min(0)
  movingDays: number;
}
