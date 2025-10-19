import { createRoot } from 'react-dom/client'
import './index.css'
import router from "./router"

import {RouterProvider,} from "react-router";
import {ToastContainer} from "react-toastify";

createRoot(document.getElementById('root')!).render(
  <>
    <RouterProvider router={router}/>
    <ToastContainer/>
  </>
)