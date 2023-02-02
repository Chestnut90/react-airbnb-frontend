import { useQuery } from "@tanstack/react-query";
import { getMe } from "../api";
import { IUser } from "../type";

export default function useUser() {
    const { isLoading, data, isError, error } = useQuery<IUser>(["me"], getMe, {
        retry: false,
        refetchOnWindowFocus: false,
    });

    return {
        isLoading,
        user: data,
        isSignedIn: !isError,
    }
}