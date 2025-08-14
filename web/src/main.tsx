import { createRoot } from 'react-dom/client'
import './index.css'
import router from "./router"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import {RouterProvider,} from "react-router";
import {ToastContainer} from "react-toastify";


const root = document.getElementById("root");

createRoot(root!).render(
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <RouterProvider router={router} />
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      pauseOnHover
      draggable
      pauseOnFocusLoss
    />
  </LocalizationProvider>
)