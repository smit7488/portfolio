import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import './main.css'; // single entry for all CSS

import "@fontsource/raleway/700.css";
import "@fontsource/montserrat/400.css";
import "@fontsource/montserrat/600.css";

import App from "./App.tsx";



createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
