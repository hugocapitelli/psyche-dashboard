import { useEffect } from "react";

/**
 * Página de login — redireciona para o Auth Portal central.
 */
export function LoginPage() {
  useEffect(() => {
    const authPortal =
      import.meta.env.VITE_AUTH_PORTAL_URL ?? "https://auth.eximia.app";
    const returnUrl = window.location.origin + "/dashboard";
    window.location.href = `${authPortal}/login?redirect=${encodeURIComponent(returnUrl)}`;
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-zinc-400">
      Redirecionando para login...
    </div>
  );
}
