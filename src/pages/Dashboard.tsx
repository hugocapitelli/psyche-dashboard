import { useAuthContext } from "@eximia/auth/components";
import { useRBAC } from "@eximia/auth/hooks";

export function DashboardPage() {
  const { user, signOut } = useAuthContext();
  const { role, isAdmin, loading: rbacLoading } = useRBAC("psyche-dashboard", {
    cookieDomain: import.meta.env.VITE_COOKIE_DOMAIN,
  });

  const handleSignOut = async () => {
    await signOut();
    window.location.href =
      import.meta.env.VITE_AUTH_PORTAL_URL ?? "https://auth.eximia.app";
  };

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Header */}
      <header className="border-b border-zinc-800 bg-zinc-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <span className="text-2xl font-bold">
                <span className="text-[#FDBF68]">Psyche</span>
              </span>
              <span className="text-zinc-600 text-sm">Dashboard</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-zinc-400">{user?.email}</span>
              {!rbacLoading && (
                <span className="text-xs text-zinc-600 capitalize">
                  {role === "global_admin" ? "Admin" : role}
                </span>
              )}
              <button
                onClick={handleSignOut}
                className="text-sm text-zinc-500 hover:text-red-400 transition-colors"
              >
                Sair
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          <div>
            <h1 className="text-2xl font-bold text-white">Psyche Dashboard</h1>
            <p className="text-zinc-400 mt-1">
              Análise de profundidade psicológica
            </p>
          </div>

          {/* Status card */}
          <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              <span className="text-green-400 font-medium">
                Sistema Operacional
              </span>
            </div>
            <p className="mt-4 text-zinc-300">
              SSO integrado via cookie compartilhado. Autenticação unificada
              com o ecossistema eximIA.
            </p>
          </div>

          {/* Debug info */}
          <div className="p-4 bg-zinc-900/30 border border-zinc-800/50 rounded-lg">
            <p className="text-xs text-zinc-500 font-mono">
              User ID: {user?.id}
            </p>
            <p className="text-xs text-zinc-500 font-mono">
              Email: {user?.email}
            </p>
            <p className="text-xs text-zinc-500 font-mono">
              Role: {rbacLoading ? "loading..." : role ?? "none"}
            </p>
            <p className="text-xs text-zinc-500 font-mono">
              Is Admin: {rbacLoading ? "loading..." : String(isAdmin)}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
