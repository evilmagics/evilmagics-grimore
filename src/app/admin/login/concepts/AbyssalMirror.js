"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function AbyssalMirror() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError("The Abyss rejects your reflection.");
      setIsLoading(false);
    } else {
      router.push("/admin");
    }
  };

  return (
    <div className="w-full h-screen bg-neutral-950 flex items-center justify-center relative overflow-hidden font-sans">
      
      {/* Abyssal Liquid/Distortion Background */}
      <div className="absolute inset-0 bg-[linear-gradient(45deg,#000_25%,#0a0a0a_50%,#000_75%)] bg-[length:400%_400%] animate-[gradient_15s_ease_infinite] opacity-80" />
      <div className="absolute inset-0 backdrop-blur-[100px] bg-black/40 pointer-events-none" />
      
      {/* Slow moving orb behind the glass */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-[80px] animate-[pulse_8s_ease-in-out_infinite]" />

      <div className="relative z-10 w-full max-w-sm p-10 backdrop-blur-sm bg-white/[0.02] border border-white/[0.05] rounded-3xl shadow-2xl transition-all duration-700 hover:bg-white/[0.04] group">
        
        <h2 className="text-white/40 text-sm font-light tracking-[0.4em] uppercase text-center mb-12 group-hover:text-white/80 transition-colors duration-500">
          Abyssal Mirror
        </h2>

        <form onSubmit={handleLogin} className="space-y-8">
            <div className="relative">
                <input 
                    type="email" 
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="peer w-full bg-transparent border-b border-white/10 text-white/90 text-sm py-2 px-1 outline-none transition-all focus:border-white/50 focus:bg-white/[0.02] placeholder-transparent"
                    placeholder="Reflection ID"
                />
                <label className="absolute left-1 top-2 text-white/30 text-xs tracking-widest uppercase transition-all peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-white/60 peer-valid:-top-4 peer-valid:text-[10px] peer-valid:text-white/60 pointer-events-none">
                    Reflection ID
                </label>
            </div>
            
            <div className="relative">
                <input 
                    type="password" 
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="peer w-full bg-transparent border-b border-white/10 text-white/90 text-sm py-2 px-1 outline-none transition-all focus:border-white/50 focus:bg-white/[0.02] placeholder-transparent"
                    placeholder="Depth Echo"
                />
                <label className="absolute left-1 top-2 text-white/30 text-xs tracking-widest uppercase transition-all peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-white/60 peer-valid:-top-4 peer-valid:text-[10px] peer-valid:text-white/60 pointer-events-none">
                    Depth Echo
                </label>
            </div>

            {error && <p className="text-red-400/80 text-xs font-light text-center tracking-wide">{error}</p>}

            <button 
                type="submit" 
                disabled={isLoading}
                className="w-full mt-4 py-3 rounded-xl bg-white/5 text-white/50 text-xs uppercase tracking-[0.2em] hover:bg-white/10 hover:text-white transition-all duration-500 border border-white/5 hover:border-white/20"
            >
                {isLoading ? 'Sinking...' : 'Submerge'}
            </button>
        </form>
      </div>

      <style jsx global>{`
        @keyframes gradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
}
