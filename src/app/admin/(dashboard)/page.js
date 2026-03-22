import { FolderKanban, Image as ImageIcon, Mail, Server, Activity } from "lucide-react";
import { fetchDashboardMetrics, checkDbHealth } from "@/lib/queries";

export default async function NexusOverview() {
  // Server-side data fetch
  const [metrics, dbHealth] = await Promise.all([
    fetchDashboardMetrics(),
    checkDbHealth(),
  ]);

  const cards = [
    { label: "Active Constructs (Projects)", value: metrics.projectCount, icon: FolderKanban, color: "text-emerald-500", border: "border-emerald-500/20" },
    { label: "Echoes Preserved (Photos)", value: metrics.photoCount, icon: ImageIcon, color: "text-purple-500", border: "border-purple-500/20" },
    { label: "Anomalies (Unread Msgs)", value: metrics.unreadMessageCount, icon: Mail, color: "text-amber-500", border: "border-amber-500/20" },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
      <header className="border-b border-[#1A2F23] pb-4">
        <h1 className="text-3xl font-bold tracking-widest text-white uppercase flex items-center gap-3">
          <Activity className="w-6 h-6 text-cyan-500" />
          Nexus Overview
        </h1>
        <p className="text-gray-500 font-mono text-sm mt-2">SYSTEM STATUS: <span className={dbHealth.status === "Online" ? "text-emerald-400" : "text-red-400"}>{dbHealth.status === "Online" ? "OPTIMAL" : "DEGRADED"}</span></p>
      </header>

      {/* Pulse Metrics */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((m, i) => (
          <div key={i} className={`bg-[#0A0A0A] border ${m.border} p-6 tracking-widest relative overflow-hidden group`}>
            <div className={`absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity`}>
               <m.icon className={`w-32 h-32 ${m.color}`} />
            </div>
            <div className="relative z-10 flex flex-col h-full justify-between">
              <span className="text-gray-500 text-xs uppercase font-mono">{m.label}</span>
              <div className="mt-4 flex items-end justify-between">
                <span className="text-4xl font-bold text-white">{m.value}</span>
                <m.icon className={`w-5 h-5 ${m.color}`} />
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Database Status & System Info */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Connection Status */}
        <section className="col-span-1 bg-[#0A0A0A] border border-[#1A2F23] p-6 text-sm font-mono space-y-4">
          <h2 className="text-gray-400 uppercase tracking-widest border-b border-[#1A2F23] pb-2 flex items-center gap-2">
            <Server className="w-4 h-4 text-cyan-500" />
            Supabase Connection
          </h2>
          <div className="flex justify-between items-center">
            <span className="text-gray-500">Status</span>
            <span className={dbHealth.status === "Online" ? "text-emerald-500" : "text-red-500"}>{dbHealth.status}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-500">Latency</span>
            <span className="text-gray-300">{dbHealth.latency} ms</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-500">Provider</span>
            <span className="text-gray-300">Supabase PostgreSQL</span>
          </div>
        </section>

        {/* System Summary */}
        <section className="col-span-1 lg:col-span-2 bg-[#0A0A0A] border border-[#1A2F23] p-6 text-sm font-mono">
          <h2 className="text-gray-400 uppercase tracking-widest border-b border-[#1A2F23] pb-2">System Architecture</h2>
          <div className="space-y-4 mt-4">
            <div className="flex gap-4">
              <span className="text-gray-600">[LAYER]</span>
              <span className="text-emerald-500">Database:</span>
              <span className="text-gray-300">7 tables, RLS enabled, {metrics.projectCount + metrics.photoCount + metrics.unreadMessageCount}+ records</span>
            </div>
            <div className="flex gap-4">
              <span className="text-gray-600">[LAYER]</span>
              <span className="text-cyan-500">Security:</span>
              <span className="text-gray-300">24 RLS policies, is_admin() gatekeeper, auto-profile trigger</span>
            </div>
            <div className="flex gap-4">
              <span className="text-gray-600">[LAYER]</span>
              <span className="text-purple-500">Auth:</span>
              <span className="text-gray-300">Email/Password via Supabase Auth, middleware session refresh</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
