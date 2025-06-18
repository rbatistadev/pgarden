import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty } from 'class-validator';
import { AbsenceType } from 'src/domain/model/absence/absence-type';

export class RequestAbsenceDto {
  @ApiProperty({ enum: AbsenceType })
  @IsNotEmpty()
  type: AbsenceType;

  @ApiProperty()
  @IsDateString()
  startDate: string;

  @ApiProperty()
  @IsDateString()
  endDate: string;
}
