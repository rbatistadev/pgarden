import { forwardRef, Module } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { DomainModule } from '../domain/domain.module';
import { InfrastructureModule } from 'src/infrastructure/infrastructure.module';

@Module({
  imports: [forwardRef(() => DomainModule), InfrastructureModule],
  controllers: [UserController],
  providers: [UserService],
})
export class ApplicationModule {}
