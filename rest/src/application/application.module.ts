import { forwardRef, Module } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { DomainModule } from '../domain/domain.module';
import { InfrastructureModule } from 'src/infrastructure/infrastructure.module';
import { AuthController } from './auth/auth.controller';
import { AuthLoginService } from './auth/auth-login.service';
import { AuthRegisterService } from './auth/auth-register.service';

@Module({
  imports: [forwardRef(() => DomainModule), InfrastructureModule],
  controllers: [UserController, AuthController],
  providers: [UserService, AuthLoginService, AuthRegisterService],
})
export class ApplicationModule {}
