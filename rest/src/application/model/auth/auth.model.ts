import { Role } from 'src/domain/model/role/role';

export type TokenModel = {
  userId: string | null;
  email: string;
  role: Role;
};

export type RequestUser = TokenModel & {
  companyId: string;
};
