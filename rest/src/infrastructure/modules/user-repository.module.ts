import { Global, Module } from '@nestjs/common';
import { UserPrismaRepository } from '../prisma/repositories/user-prisma.repository';
import { USER_REPOSITORY_INTERFACE } from 'src/domain/model/user/user.repository.interface';

@Global()
@Module({
  providers: [
    UserPrismaRepository,
    { provide: USER_REPOSITORY_INTERFACE, useClass: UserPrismaRepository },
  ],
  exports: [USER_REPOSITORY_INTERFACE],
})
export class UserRepositoryModule {}
