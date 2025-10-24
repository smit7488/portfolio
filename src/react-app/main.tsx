import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./index.css";
import './App.css'; 
import "@fontsource/raleway/700.css";
import "@fontsource/allura/400.css";
import "@fontsource/montserrat/400.css"; // Regular
import "@fontsource/montserrat/600.css"; // Bold
import App from "./App.tsx";



createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
