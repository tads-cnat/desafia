import { User } from "./User";

export interface LoginResponse {
    access: string;
    refresh: string;
    user?: User;
}
