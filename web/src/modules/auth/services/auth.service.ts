import { APIService } from '@/services/api.service';
import { LoginRequest, LoginResponse } from 'src/lib/models/auth';

type ISignupRequest = {
  name: string;
  email: string;
  password: string;
};

type ISignupResponse = {
  token: string;
  refreshToken: string;
};

export class AuthService extends APIService {
  constructor() {
    super(process.env.NEXT_PUBLIC_API_BASE_URL ?? '');
  }

  async login(data: LoginRequest): Promise<LoginResponse> {
    const response = await this.post('/auth/login', data);
    return response.data;
  }

  async signup(data: ISignupRequest): Promise<ISignupResponse> {
    const response = await this.post('/auth/register', { ...data });

    return response.data;
  }
}
