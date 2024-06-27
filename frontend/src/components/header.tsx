import { Link } from "react-router-dom";
import { Logo } from "./logo";
import { SignedOut, SignedIn, UserButton } from "@clerk/clerk-react";

export const Header = () => {
    return (
        <header className="h-14 border-b border-neutral-200 flex items-center px-4">
            <Logo />

            <div className="ml-auto">
                <SignedOut>
                    <Link
                        to={"/sign-in"}
                        className="bg-blue-500 hover:bg-blue-400 transition-colors px-3 py-2 rounded-md text-sm font-medium text-white"
                    >
                        Join now
                    </Link>
                </SignedOut>

                <SignedIn>
                    <UserButton afterSignOutUrl="/" />
                </SignedIn>
            </div>
        </header>
    );
};
