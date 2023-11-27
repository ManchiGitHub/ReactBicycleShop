import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { Home } from "./pages/Home";
import { TriviaQuestionPage } from "./pages/TriviaQuestionPage";

export const broswerRouter = createBrowserRouter([
    {
        element: <App />,
        children: [
            {
                path: "/trivia",
                element: <TriviaQuestionPage />
            },
            {
                path: "/",
                element: <Home />
            }
        ]
    }
]);