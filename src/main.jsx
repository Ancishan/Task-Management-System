import { RouterProvider } from "react-router-dom";
import ReactDOM from 'react-dom/client'
import './index.css'
import { router } from "./Routes/Routes";
import AuthProvider from "./Provider/AuthProvider";

ReactDOM.createRoot(document.getElementById('root')).render(

  <AuthProvider>

    <div className='max-w-screen-xl mx-auto'>
      <RouterProvider router={router} />
    </div>

  </AuthProvider>


)
