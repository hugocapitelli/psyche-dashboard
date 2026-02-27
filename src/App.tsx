import { Routes, Route, Navigate } from "react-router-dom";
import { ProtectedRoute } from "@eximia/auth/components";
import { DashboardPage } from "./pages/Dashboard";
import { LoginPage } from "./pages/Login";

export default function App() {
  const loginUrl = import.meta.env.VITE_AUTH_PORTAL_URL
    ? `${import.meta.env.VITE_AUTH_PORTAL_URL}/login?redirect=${encodeURIComponent(window.location.origin)}`
    : "/login";

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute
            options={{
              loginUrl,
              redirectMode: "location",
              cookieDomain: import.meta.env.VITE_COOKIE_DOMAIN,
            }}
          >
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
