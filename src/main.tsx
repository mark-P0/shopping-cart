import React from "react";
import ReactDOM from "react-dom/client";
import {
  RouterProvider,
  createHashRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { AppTree } from "./App.tsx";
import "./index.css";

const router = createHashRouter(createRoutesFromElements(AppTree));
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
