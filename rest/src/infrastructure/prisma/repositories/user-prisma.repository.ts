import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { IUserRepository } from 'src/domain/user/user.repository';
import { User } from 'src/domain/user/user.entity';

@Injectable()
export class UserPrismaRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(user: User): Promise<User> {
    const record = await this.prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
        companyId: user.companyId,
      },
    });

    return new User(
      record.id,
      record.name,
      record.email,
      record.password,
      record.companyId,
      record.createdAt,
    );
  }

  async findByEmail(email: string, companyId: string): Promise<User | null> {
    const user = await this.prisma.user.findFirst({
      where: { email, companyId },
    });
    return user
      ? new User(
          user.id,
          user.name,
          user.email,
          user.password,
          user.companyId,
          user.createdAt,
        )
      : null;
  }
}
