"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, FolderKanban, Image as ImageIcon, Mail, LogOut, Command as CmdIcon } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

const NAV_ITEMS = [
  { name: "Nexus", href: "/admin", icon: LayoutDashboard },
  { name: "The Archivist", href: "/admin/projects", icon: FolderKanban },
  { name: "Memory Keeper", href: "/admin/gallery", icon: ImageIcon },
  { name: "Signal Receiver", href: "/admin/messages", icon: Mail },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  return (
    <aside className="w-64 border-r border-[#1A2F23] bg-[#050505] flex flex-col h-full">
      <div className="p-6 border-b border-[#1A2F23]">
        <h1 className="text-xl font-bold tracking-[0.2em] text-white uppercase text-sm">
          Strict <span className="text-[#1A2F23] font-light">||</span> Sanctum
        </h1>
        <p className="text-xs text-gray-600 font-mono mt-2 tracking-widest uppercase">Obsidian Analytics</p>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link 
              key={item.href} 
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-md transition-all duration-300 font-mono text-sm tracking-wide
                ${isActive ? 'bg-[#1A2F23]/20 text-cyan-400 border border-[#1A2F23]' : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'}
              `}
            >
              <Icon className="w-4 h-4" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-[#1A2F23] space-y-4">
        {/* Command Palette Hint */}
        <div className="flex items-center justify-between text-xs font-mono text-gray-500 bg-[#1A2F23]/10 p-3 rounded-md border border-[#1A2F23]/50">
          <span className="flex items-center gap-2"><CmdIcon className="w-3 h-3"/> CMD+K</span>
          <span>Command Palette</span>
        </div>

        <button 
          onClick={handleLogout}
          className="flex w-full items-center gap-3 px-4 py-3 text-red-900/80 hover:text-red-500 transition-colors font-mono text-sm tracking-wide rounded-md hover:bg-red-950/20"
        >
          <LogOut className="w-4 h-4" />
          Disconnect
        </button>
      </div>
    </aside>
  );
}
