import { forwardRef, Module } from '@nestjs/common';
import { InfrastructureModule } from 'src/infrastructure/infrastructure.module';

@Module({
  imports: [forwardRef(() => InfrastructureModule)],
})
export class DomainModule {}
