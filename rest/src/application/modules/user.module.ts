import { Module } from '@nestjs/common';
import { UserController } from '../controller/user.controller';
import { CreateUserService } from '../service/user/create-user.service';
@Module({
  controllers: [UserController],
  providers: [CreateUserService],
})
export class UserModule {}
