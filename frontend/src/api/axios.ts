import axios from "axios";
import { getAuth, logout, updateAuth } from "../store/AuthStore";
import AuthService from "../services/AuthService";
const BASE_URL = `http://${import.meta.env.VITE_HOST}/api`;

export default axios.create({
    baseURL: BASE_URL,
});

const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
});

axiosPrivate.interceptors.request.use(
    (config) => {
        const auth = getAuth();
        if (!config.headers["Authorization"]) {
            config.headers["Authorization"] = `Bearer ${auth?.access}`;
        }
        return config;
    },
    (error) => Promise.reject(error),
);

axiosPrivate.interceptors.response.use(
    (response) => response,
    async (error) => {
        const prevRequest = error?.config;
        const auth = getAuth();

        if (auth && error?.response?.status === 401 && !prevRequest?.sent) {
            prevRequest.sent = true;

            AuthService.refresh(auth?.refresh)
                .then((newAuthTokens) => {
                    prevRequest.headers["Authorization"] =
                        `Bearer ${newAuthTokens.access}`;
                    updateAuth(newAuthTokens);
                })
                .catch((err) => {
                    console.error(err);
                    logout();
                });
            return axiosPrivate(prevRequest);
        }
        return Promise.reject(error);
    },
);

export { axiosPrivate };
