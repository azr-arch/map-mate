import { SignIn } from "@clerk/clerk-react";

export const Login = () => {
    return (
        <div className="w-full pt-12 flex items-center justify-center">
            <SignIn />
        </div>
    );
};
