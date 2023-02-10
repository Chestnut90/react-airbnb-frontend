import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useUser from "./useUser";


export default function useHostOnlyPage() {
    const { isLoading, user } = useUser();
    const navigate = useNavigate();
    useEffect(() => {
        if (!isLoading) {
            if (!user?.is_host) {
                navigate("/");
            }
        }
    }, [isLoading, user, navigate]);

    return;
}