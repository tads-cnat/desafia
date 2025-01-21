import axios from "../api/axios";
import { LoginResponse } from "../types/application/LoginResponse";

class AuthService {
    serviceUrl: string;

    constructor(serviceUrl: string) {
        this.serviceUrl = serviceUrl;
    }

    async login(username: string, password: string): Promise<LoginResponse> {
        const res = await axios.post(`${this.serviceUrl}/login/`, {
            username,
            password,
        });

        return { ...res.data };
    }

    async refresh(refreshToken: string): Promise<LoginResponse> {
        const res = await axios.post(`${this.serviceUrl}/refresh/`, {
            refresh: refreshToken,
        });

        return { ...res.data };
    }

    async register(nome: string, username: string, password: string): Promise<LoginResponse> {
        const res = await axios.post(`${this.serviceUrl}/register/`, {
            nome,
            username,
            password,
        });

        return { ...res.data };
    }
}

export default new AuthService("auth");
