import { RouterProvider } from "react-router-dom";
import ReactDOM from 'react-dom/client'
import './index.css'
import { router } from "./Routes/Routes";
import AuthProvider from "./Provider/AuthProvider";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById('root')).render(

  <AuthProvider>

    <div>
      <RouterProvider router={router} />
    </div>
    <Toaster />

  </AuthProvider>


)
