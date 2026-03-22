"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function LoginPage() {
  const [isRevealed, setIsRevealed] = useState(false);
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
      setError("[ ERROR: THE SEAL REJECTS YOU ]");
      setIsLoading(false);
    } else {
      router.push("/admin");
    }
  };

  return (
    <main 
      className="w-full h-screen bg-[#050505] flex items-center justify-center relative overflow-hidden font-mono text-[#E0E0E0] selection:bg-[#00E5FF]/20 selection:text-white"
      onClick={() => !isRevealed && setIsRevealed(true)}
    >
      
      {/* Alchemic Array Background (Adapted to Home Page Colors) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30 mix-blend-screen">
        <motion.div 
            animate={{ rotate: 360 }} 
            transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
            className="absolute w-[800px] h-[800px] rounded-full border border-[#00E5FF]/10 flex items-center justify-center shadow-[0_0_50px_rgba(0,229,255,0.05)]"
        >
            <div className="w-[780px] h-[780px] rounded-full border border-dashed border-[#00E5FF]/20" />
            <motion.div animate={{ rotate: -720 }} transition={{ duration: 180, repeat: Infinity, ease: "linear" }} className="absolute w-[600px] h-[600px] border border-[#00E5FF]/10 rotate-45 transform" />
            <motion.div animate={{ rotate: 720 }} transition={{ duration: 180, repeat: Infinity, ease: "linear" }} className="absolute w-[600px] h-[600px] border border-[#00E5FF]/10 rotate-12 transform" />
        </motion.div>
        
        <motion.div 
            animate={{ rotate: -360 }} 
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="absolute w-[400px] h-[400px] rounded-full border-2 border-[#00E5FF]/10 flex items-center justify-center shadow-[0_0_30px_rgba(0,229,255,0.05)]"
        >
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 45, repeat: Infinity, ease: "linear" }} className="absolute w-[380px] h-[380px] border border-dashed border-[#00E5FF]/20" />
            <div className="absolute w-[280px] h-[280px] border border-[#00E5FF]/20 rotate-45" />
        </motion.div>
      </div>

      <AnimatePresence mode="wait">
        {!isRevealed ? (
          // Pre-view State (Void Threshold)
          <motion.div
            key="locked"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-gray-500 tracking-[0.3em] text-xs md:text-sm animate-pulse cursor-pointer uppercase text-center relative z-10 p-8"
          >
            [ SYSTEM LOCKED. IDENTIFY YOURSELF ]
          </motion.div>
        ) : (
          // Refined Form (Sealed Grimoire + improved spacing)
          <motion.div
            key="form"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative z-10 w-full max-w-[420px] p-6 md:p-8 bg-[#0d1f17]/40 backdrop-blur-xl border border-[#1A2F23] shadow-2xl"
          >
            {/* Ornate Tech-Corners */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-[#00E5FF]/50 -translate-x-[1px] -translate-y-[1px]"></div>
            <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-[#00E5FF]/50 translate-x-[1px] -translate-y-[1px]"></div>
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-[#00E5FF]/50 -translate-x-[1px] translate-y-[1px]"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-[#00E5FF]/50 translate-x-[1px] translate-y-[1px]"></div>

            <div className="text-center mb-8 md:mb-10 space-y-3">
              <h2 className="text-[#00E5FF] font-heading text-xl md:text-2xl uppercase tracking-[0.2em] md:tracking-[0.3em]">Seal of the Sanctum</h2>
              <div className="h-px w-24 mx-auto bg-gradient-to-r from-transparent via-[#00E5FF]/50 to-transparent"></div>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              
              <div className="space-y-1 group">
                <label className="block px-2 md:px-4 text-[#00E5FF]/70 uppercase text-[10px] md:text-xs tracking-[0.2em] group-focus-within:text-[#00E5FF] transition-colors">
                  [ UID - INCANTATION ]
                </label>
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full px-2 md:px-4 bg-transparent border-b border-[#1A2F23] text-white py-3 md:py-4 md:text-base outline-none focus:border-[#00E5FF] transition-colors placeholder-gray-800"
                  placeholder="architect@thevoid.net"
                />
              </div>
              
              <div className="space-y-1 group">
                <label className="block px-2 md:px-4 text-[#00E5FF]/70 uppercase text-[10px] md:text-xs tracking-[0.2em] group-focus-within:text-[#00E5FF] transition-colors">
                  [ ESSENCE - SACRED WORD ]
                </label>
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full px-2 md:px-4 bg-transparent border-b border-[#1A2F23] text-white py-3 md:py-4 md:text-base outline-none focus:border-[#00E5FF] transition-colors tracking-[0.3em] placeholder-gray-800"
                  placeholder="••••••••••••"
                />
              </div>

              {error && (
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    className="text-red-400 border border-red-900/50 bg-red-950/20 px-4 py-3 text-center text-xs md:text-sm tracking-widest mt-6 w-full"
                  >
                    {error}
                  </motion.div>
              )}

              <div className="pt-4">
                <button 
                  type="submit" 
                  disabled={isLoading}
                  className={`w-full tracking-[0.2em] uppercase text-xs font-bold py-4 border transition-all duration-300
                      ${isLoading 
                          ? 'bg-[#00E5FF]/10 text-[#00E5FF] border-[#00E5FF] animate-pulse shadow-[0_0_20px_rgba(0,229,255,0.2)]'
                          : 'bg-transparent text-[#00E5FF]/70 border-[#00E5FF]/30 hover:bg-[#00E5FF]/10 hover:text-[#00E5FF] hover:border-[#00E5FF] shadow-[inset_0_0_0_1px_transparent] hover:shadow-[0_0_15px_rgba(0,229,255,0.1)]'
                      }
                  `}
                >
                  {isLoading ? 'Verifying...' : 'Break The Seal'}
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
