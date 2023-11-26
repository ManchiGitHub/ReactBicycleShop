import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { NotFound } from "./pages/NotFound";
import { Home } from "./pages/Home";
import { Bicycles } from "./pages/Bicycles";
import Bicycle from "./pages/Bicycle";
import { Users } from "./pages/Users";
import UserPage from "./pages/User";

export const browserRouter = createBrowserRouter([
    {
        element: <App />,
        children: [
            {
                path: "/bicycles/:bicycleId",
                element: <Bicycle />
            },
            {
                path: "/bicycles",
                element: <Bicycles />
            },
            {
                path: "/users/:userId",
                element: <UserPage />
            },
            {
                path: "/users",
                element: <Users />
            },
            {
                path: "/",
                element: <Home />
            },
            {
                path: "*",
                element: <NotFound />
            }
        ]
    }
]);