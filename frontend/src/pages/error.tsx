import { useRouteError } from "react-router-dom";

export const Error = () => {
    const error = useRouteError();

    console.log({ error });

    return (
        <div className="w-full h-full">
            <h1>Looks like we've hit an erorr</h1>
            <p>Something went wrong, please try again some time later!</p>
        </div>
    );
};
