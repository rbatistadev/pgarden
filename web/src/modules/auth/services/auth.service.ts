/* eslint-disable @typescript-eslint/no-explicit-any */
import { APIService } from '@/lib/services/api.service';

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

  async login(data: any): Promise<any> {
    const response = await this.post('/auth/login', data);
    return response.data;
  }

  async signup(data: ISignupRequest): Promise<ISignupResponse> {
    const response = await this.post('/auth/register', { ...data });

    return response.data;
  }
}
