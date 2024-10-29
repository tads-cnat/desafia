import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useAuth from "../store/AuthStore";
import useRefreshToken from "../hooks/useRefreshToken";

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const { auth } = useAuth();

    useEffect(() => {
        let isMounted = true;

        const verifyRefreshToken = async () => {
            try {
                await refresh();
            } catch (err) {
                console.error(err);
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        };

        if (!auth?.access) {
            verifyRefreshToken();
        } else {
            setIsLoading(false);
        }

        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <>
            {isLoading ? (
                <div className="w-screen h-screen flex justify-center items-center">
                    <span className="loading loading-spinner loading-lg" />
                </div>
            ) : (
                <Outlet />
            )}
        </>
    );
};

export default PersistLogin;
