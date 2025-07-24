import { APIService } from "@/core/services/api.service";

export class AuthService extends APIService {
    constructor() {
        super(process.env.NEXT_PUBLIC_API_BASE_URL ?? '')
    }

    async login(data: any): Promise<any> {
        const response = await this.post("/auth/login", data);
        return response.data;
    }
}