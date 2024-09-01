import {createBrowserRouter} from "react-router-dom";
import Main from "../LayOut/Main";
import HomePage from "../Pages/homePage/HomePage";
import Registration from "../Pages/Authentication/Registration";
import Login from "../Pages/Authentication/Login";
import UpdateProfile from "../Pages/Authentication/UpdateProfile";
import FileUpload from "../Pages/FileUpload";
import FileShow from "../Pages/FileShow";
import FileManagement from "../Component/FileManagement";

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
        {
          path:'/login',
          element:<Login></Login>
        },
        {
          path:'/profile',
          element:<UpdateProfile></UpdateProfile>
        },
        {
          path:'/upload',
          element:<FileUpload></FileUpload>
        },
        {
          path:'/show',
          element:<FileShow></FileShow>
        },
        {
          path:'/fileShow',
          element:<FileManagement></FileManagement>
        },
      ],
    },
  ]);