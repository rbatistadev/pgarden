import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../service/auth/auth.guard';
import { RolesGuard } from '../service/rol/rolges.guard';
import { CreateUserService } from '../service/user/create-user.service';
import { Roles } from '../decorators/roles.decorator';
import { CreateUserDto } from '../model/user/create-user.dto';
import { CurrentUser } from '../decorators/current-user.decorator';
import { RequestUser } from '../model/auth/auth.model';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('users')
@UseGuards(AuthGuard, RolesGuard)
export class UserController {
  constructor(private readonly createUserService: CreateUserService) {}

  @Post()
  @Roles('ADMIN')
  async createUser(
    @Body() dto: CreateUserDto,
    @CurrentUser() currentUser: RequestUser,
  ) {
    return this.createUserService.execute(dto, currentUser);
  }
}
