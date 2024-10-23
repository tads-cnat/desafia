import GenericService from "./GenericService";

class AuthService extends GenericService {
    async login(username: string, password: string) {
        const res = await super.post({ username, password });

        console.log(res);
    }
}

export default new AuthService("login");
