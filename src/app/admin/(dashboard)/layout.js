import { CommandPalette } from "@/components/admin/CommandPalette";
import { Sidebar } from "@/components/admin/Sidebar";

export const metadata = {
  title: 'The Inner Sanctum | Dashboard',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminDashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#050505] text-white flex overflow-hidden font-mono selection:bg-cyan-900/50">
      <Sidebar />
      <main className="flex-1 overflow-y-auto relative">
        {/* Subtle grid background for structural feel */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1A2F2311_1px,transparent_1px),linear-gradient(to_bottom,#1A2F2311_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
        <div className="relative z-10 p-8">
            {children}
        </div>
      </main>
      <CommandPalette />
    </div>
  );
}
