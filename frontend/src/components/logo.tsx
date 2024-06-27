export const Logo = () => {
    return (
        <div className=" flex items-center gap-x-2">
            <img src="/src/assets/logo.svg" alt="Logo" className="w-6 h-6 object-cover" />
            <span className="font-bold text-base tracking-wide text-black">MapMate</span>
        </div>
    );
};
