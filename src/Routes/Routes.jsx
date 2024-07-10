import {createBrowserRouter} from "react-router-dom";
import Main from "../LayOut/Main";
import HomePage from "../Pages/homePage/HomePage";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
          path: '/',
          element: <HomePage></HomePage>,
        },
      ],
    },
  ]);