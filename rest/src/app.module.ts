import { Module } from '@nestjs/common';
import { ApplicationModule } from './application/application.module';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { DomainModule } from './domain/domain.module';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
@Module({
  imports: [
    EventEmitterModule.forRoot(),
    ApplicationModule,
    InfrastructureModule,
    DomainModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
  ],
})
export class AppModule {}
