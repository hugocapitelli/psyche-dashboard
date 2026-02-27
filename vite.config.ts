import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "VITE_");

  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    define: {
      // Mapear VITE_* para process.env.NEXT_PUBLIC_* para compatibilidade com @eximia/auth
      "process.env.NEXT_PUBLIC_SUPABASE_URL": JSON.stringify(
        env.VITE_SUPABASE_URL
      ),
      "process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY": JSON.stringify(
        env.VITE_SUPABASE_ANON_KEY
      ),
      "process.env.NEXT_PUBLIC_COOKIE_DOMAIN": JSON.stringify(
        env.VITE_COOKIE_DOMAIN
      ),
    },
  };
});
