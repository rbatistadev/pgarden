import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtService } from './jwt.service';
import { JwtStrategy } from './jwt.strategy';
import { AUTH_INTERFACE } from 'src/application/model/auth/auth.interface';

@Global()
@Module({
  imports: [JwtModule.register({})],
  providers: [
    JwtService,
    JwtStrategy,
    { provide: AUTH_INTERFACE, useClass: JwtService },
  ],
  exports: [AUTH_INTERFACE],
})
export class AuthModule {}
