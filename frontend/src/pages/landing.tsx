import { useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Landing = () => {
    const { isSignedIn } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isSignedIn) {
            navigate("/dashboard");
        }
    }, [isSignedIn, navigate]);

    return (
        <div className="w-full h-full pt-5 flex items-center justify-center flex-col space-y-4">
            <div className="space-y-1 text-black text-center">
                <h1 className="text-[3vw] font-bold">Welcome to MapMate</h1>
                <p className="text-sm">Meet new people near you in real-time</p>
            </div>

            <Link
                to={"/sign-in"}
                className="bg-blue-600 hover:bg-blue-500 transition-colors text-white rounded-md text-sm py-2 px-3"
            >
                Get started
            </Link>
        </div>
    );
};
