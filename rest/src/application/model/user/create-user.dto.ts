import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail, MinLength } from 'class-validator';
import { Role } from 'src/domain/model/role/role';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @MinLength(6)
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  role: Role;
}
