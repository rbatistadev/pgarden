import {
  Injectable,
  ConflictException,
  Inject,
  ForbiddenException,
} from '@nestjs/common';
import { CreateUserDto } from '../../model/user/create-user.dto';
import {
  IUserRepository,
  USER_REPOSITORY_INTERFACE,
} from 'src/domain/model/user/user.repository.interface';
import { hash } from 'bcrypt';
import { User } from 'src/domain/model/user/user.entity';
import { RequestUser } from 'src/application/model/auth/auth.model';

@Injectable()
export class CreateUserService {
  constructor(
    @Inject(USER_REPOSITORY_INTERFACE)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(dto: CreateUserDto, currentUser: RequestUser): Promise<User> {
    const { name, email, password, role } = dto;

    if (currentUser.role !== 'ADMIN') {
      throw new ForbiddenException('Only admins can create users.');
    }

    const existing = await this.userRepository.findByEmail(email);
    if (existing) {
      throw new ConflictException('User already exists in this company');
    }

    const passwordHash = await hash(password, 10);

    const newUser = new User(
      name,
      email,
      passwordHash,
      currentUser.companyId,
      new Date(),
      null,
      role,
    );

    return await this.userRepository.create(newUser);
  }
}
