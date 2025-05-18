import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { UserOutputDto } from './dto/user-output.dto';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger/dist/decorators';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiCreatedResponse({ type: UserOutputDto })
  async register(@Body() dto: CreateUserDto) {
    const user = await this.userService.register(dto);

    const output: UserOutputDto = {
      id: user.id,
      name: user.name,
      email: user.email,
      companyId: user.companyId,
      createdAt: user.createdAt,
    };

    return output;
  }
}
