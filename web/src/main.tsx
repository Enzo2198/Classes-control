import { createRoot } from 'react-dom/client'
import './index.css'
import router from "./router"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import {RouterProvider,} from "react-router";


const root = document.getElementById("root");

createRoot(root!).render(
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <RouterProvider router={router} />
  </LocalizationProvider>
)