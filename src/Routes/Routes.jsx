import {createBrowserRouter} from "react-router-dom";
import Main from "../LayOut/Main";
import HomePage from "../Pages/homePage/HomePage";
import Registration from "../Pages/Authentication/Registration";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
          path: '/',
          element: <HomePage></HomePage>,
        },
        {
          path:'/reg',
          element:<Registration></Registration>
        },
      ],
    },
  ]);