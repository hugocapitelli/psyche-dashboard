import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "@eximia/auth/components";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider
        options={{ cookieDomain: import.meta.env.VITE_COOKIE_DOMAIN }}
      >
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
