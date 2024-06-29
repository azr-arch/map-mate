import { useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Loading } from "../components/loading";

export const DashboardLayout = () => {
    const { isLoaded, userId } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoaded && !userId) {
            navigate("/");
        }
    }, [isLoaded, navigate, userId]);

    if (!isLoaded) return <Loading />;

    return <Outlet />;
};
