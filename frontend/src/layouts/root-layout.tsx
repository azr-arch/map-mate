import { Header } from "../components/header";
import { useNavigate, Outlet } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
    throw new Error("Missing Publishable Key");
}

export const RootLayout = () => {
    const navigate = useNavigate();

    return (
        <ClerkProvider
            publishableKey={PUBLISHABLE_KEY}
            routerPush={(to) => navigate(to)}
            routerReplace={(to) => navigate(to, { replace: true })}
        >
            <div className="w-full h-full max-w-screen-2xl mx-auto">
                <Header />
                <Outlet />
            </div>
        </ClerkProvider>
    );
};
