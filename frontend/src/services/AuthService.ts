import axios from "../api/axios";
import { LoginResponse } from "../types/application/LoginResponse";
import GenericService from "./GenericService";

class AuthService extends GenericService {
    async login(username: string, password: string): Promise<LoginResponse> {
        const res = await axios.post(this.serviceUrl, { username, password });

        return { ...res.data };
    }
}

export default new AuthService("login");
