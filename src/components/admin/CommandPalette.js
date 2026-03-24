"use client";

import { useEffect, useState } from "react";
import { Command } from "cmdk";
import { useRouter } from "next/navigation";
import { LayoutDashboard, FolderKanban, Image as ImageIcon, Mail, FileText, PlusCircle, X } from "lucide-react";

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const down = (e) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
      if (e.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = (command) => {
    setOpen(false);
    command();
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] bg-black/50 backdrop-blur-sm"
      onClick={() => setOpen(false)}
    >
      <div
        className="w-full max-w-lg bg-[#050505] border border-[#1A2F23] rounded-lg overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.8)] animate-in fade-in slide-in-from-top-4 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <Command label="Command Palette" className="flex flex-col text-gray-200">
          {/* Header with close button */}
          <div className="flex items-center border-b border-[#1A2F23]">
            <Command.Input
              autoFocus
              placeholder="Type a command or search..."
              className="flex-1 bg-transparent text-white p-4 outline-none placeholder-gray-600 font-mono text-sm"
            />
            <button
              onClick={() => setOpen(false)}
              className="p-4 text-gray-600 hover:text-gray-300 transition-colors"
              aria-label="Close command palette"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <Command.List className="max-h-[300px] overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-[#1A2F23] scrollbar-track-transparent">
            <Command.Empty className="py-6 text-center text-sm text-gray-500 font-mono">
              Unknown command.
            </Command.Empty>

            <Command.Group heading="Navigation" className="text-xs text-gray-500 font-mono uppercase tracking-widest p-2">
              <Command.Item
                onSelect={() => runCommand(() => router.push("/admin"))}
                className="flex items-center gap-2 px-3 py-3 rounded-md cursor-pointer hover:bg-[#1A2F23]/30 aria-selected:bg-[#1A2F23]/50 text-gray-300 transition-colors"
              >
                <LayoutDashboard className="w-4 h-4 text-cyan-500" />
                <span>Go to Nexus (Home)</span>
              </Command.Item>
              <Command.Item
                onSelect={() => runCommand(() => router.push("/admin/projects"))}
                className="flex items-center gap-2 px-3 py-3 rounded-md cursor-pointer hover:bg-[#1A2F23]/30 aria-selected:bg-[#1A2F23]/50 text-gray-300 transition-colors"
              >
                <FolderKanban className="w-4 h-4 text-emerald-500" />
                <span>Manage Projects</span>
              </Command.Item>
              <Command.Item
                onSelect={() => runCommand(() => router.push("/admin/gallery"))}
                className="flex items-center gap-2 px-3 py-3 rounded-md cursor-pointer hover:bg-[#1A2F23]/30 aria-selected:bg-[#1A2F23]/50 text-gray-300 transition-colors"
              >
                <ImageIcon className="w-4 h-4 text-purple-500" />
                <span>Open Gallery</span>
              </Command.Item>
              <Command.Item
                onSelect={() => runCommand(() => router.push("/admin/messages"))}
                className="flex items-center gap-2 px-3 py-3 rounded-md cursor-pointer hover:bg-[#1A2F23]/30 aria-selected:bg-[#1A2F23]/50 text-gray-300 transition-colors"
              >
                <Mail className="w-4 h-4 text-yellow-500" />
                <span>Read Messages</span>
              </Command.Item>
            </Command.Group>

            <Command.Group heading="Quick Actions" className="text-xs text-gray-500 font-mono uppercase tracking-widest p-2 mt-2">
              <Command.Item
                onSelect={() => runCommand(() => router.push("/admin/projects?action=new"))}
                className="flex items-center gap-2 px-3 py-3 rounded-md cursor-pointer hover:bg-[#1A2F23]/30 aria-selected:bg-[#1A2F23]/50 text-gray-300 transition-colors"
              >
                <FileText className="w-4 h-4 text-gray-400" />
                <span>Create New Project</span>
              </Command.Item>
              <Command.Item
                onSelect={() => runCommand(() => router.push("/admin/gallery?action=new"))}
                className="flex items-center gap-2 px-3 py-3 rounded-md cursor-pointer hover:bg-[#1A2F23]/30 aria-selected:bg-[#1A2F23]/50 text-gray-300 transition-colors"
              >
                <PlusCircle className="w-4 h-4 text-purple-400" />
                <span>Create New Photo</span>
              </Command.Item>
            </Command.Group>

          </Command.List>
        </Command>
      </div>
    </div>
  );
}
