import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useUser from "../lib/useUser";

interface IProtectedPageProps {
    children: React.ReactNode;
}

export default function ProtectedPage({ children }: IProtectedPageProps) {

    const { isLoading, isSignedIn } = useUser();
    const navigate = useNavigate();
    useEffect(() => {
        if (!isLoading) {
            if (!isSignedIn) {
                navigate("/");
            }
        }
    }, [isLoading, isSignedIn, navigate]);

    return (<>{children}</>);
}