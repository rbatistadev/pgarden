import { forwardRef, Module } from '@nestjs/common';
import { CreateUserService } from './service/user/create-user.service';
import { DomainModule } from '../domain/domain.module';
import { InfrastructureModule } from 'src/infrastructure/infrastructure.module';
import { AuthController } from './controller/auth.controller';
import { AuthLoginService } from './service/auth/auth-login.service';
import { AuthRegisterService } from './service/auth/auth-register.service';
import { UserController } from './controller/user.controller';

@Module({
  imports: [forwardRef(() => DomainModule), InfrastructureModule],
  controllers: [UserController, AuthController],
  providers: [CreateUserService, AuthLoginService, AuthRegisterService],
})
export class ApplicationModule {}
