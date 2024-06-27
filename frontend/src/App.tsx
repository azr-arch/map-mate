import { Login } from "./components/login";
import { DashboardLayout } from "./layouts/dashboard-layout";
import { RootLayout } from "./layouts/root-layout";
import { DashboardPage } from "./pages/dashboard-page";
import { Error } from "./pages/error";
import { Landing } from "./pages/landing";

import { RouterProvider, createBrowserRouter } from "react-router-dom";

function App() {
    const router = createBrowserRouter([
        {
            element: <RootLayout />,
            errorElement: <Error />,
            children: [
                { path: "/", element: <Landing /> },
                { path: "/sign-in", element: <Login /> },
                {
                    element: <DashboardLayout />,
                    path: "dashboard",
                    children: [{ index: true, element: <DashboardPage /> }],
                },
            ],
        },
    ]);

    return (
        <div className="min-h-screen">
            <RouterProvider router={router} />
        </div>
    );
}

export default App;
