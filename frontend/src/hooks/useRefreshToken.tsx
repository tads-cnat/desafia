import axios from "../api/axios";
import useAuth from "../store/AuthStore";

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        const response = await axios.post("/login/refresh", {
            withCredentials: true,
        });
        setAuth((prev) => {
            console.log(JSON.stringify(prev));
            console.log(response.data.token);

            return {
                ...prev,
                token: response.data.token,
                refreshToken: response.data.refresh,
                user: prev?.user,
            };
        });

        return response.data.token;
    };
    return refresh;
};

export default useRefreshToken;
