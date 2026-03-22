"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function AlchemistArray() {
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
      setError("Array Destabilized: Invalid Catalysts");
      setIsLoading(false);
    } else {
      router.push("/admin");
    }
  };

  return (
    <div className="w-full h-screen bg-[#020202] flex items-center justify-center relative overflow-hidden">
      
      {/* Transmutation Circles Background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
        <motion.div 
            animate={{ rotate: 360 }} 
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="absolute w-[800px] h-[800px] rounded-full border-[1px] border-amber-500/30 flex items-center justify-center shadow-[0_0_50px_rgba(245,158,11,0.1)]"
        >
            <div className="w-[780px] h-[780px] rounded-full border-[1px] border-dashed border-amber-500/20" />
            <motion.div animate={{ rotate: -720 }} transition={{ duration: 120, repeat: Infinity, ease: "linear" }} className="absolute w-[600px] h-[600px] border-[1px] border-amber-500/40 rotate-45 transform" />
            <motion.div animate={{ rotate: 720 }} transition={{ duration: 120, repeat: Infinity, ease: "linear" }} className="absolute w-[600px] h-[600px] border-[1px] border-amber-500/40 rotate-12 transform" />
        </motion.div>
        
        <motion.div 
            animate={{ rotate: -360 }} 
            transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
            className="absolute w-[400px] h-[400px] rounded-full border-[2px] border-amber-400/50 flex items-center justify-center shadow-[0_0_30px_rgba(245,158,11,0.2)]"
        >
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} className="absolute w-[380px] h-[380px] border-[1px] border-dashed border-amber-300/60" />
            <div className="absolute w-[280px] h-[280px] border border-amber-500/30 rotate-45" />
        </motion.div>
      </div>

      {/* Form Glassmorphism */}
      <form onSubmit={handleLogin} className="relative z-10 w-full max-w-sm backdrop-blur-xl bg-black/40 p-8 rounded-full border border-amber-500/20 flex flex-col items-center shadow-[0_0_40px_rgba(0,0,0,0.8)] aspect-square justify-center">
        
        <h2 className="text-amber-500 font-mono tracking-[0.3em] uppercase text-sm mb-8 text-center bg-black/50 px-4 py-1 rounded-full border border-amber-500/30">
          Alchemic Array
        </h2>

        <div className="w-full space-y-6 flex flex-col items-center">
            <input 
                type="email" 
                placeholder="[ PRIME CATALYST ]"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="w-full text-center bg-transparent border-b border-amber-500/30 focus:border-amber-400 text-amber-100 placeholder-amber-900/50 outline-none pb-2 font-mono tracking-widest text-xs transition-colors"
            />
            
            <input 
                type="password" 
                placeholder="[ SECONDARY FOCUS ]"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="w-full text-center bg-transparent border-b border-amber-500/30 focus:border-amber-400 text-amber-100 placeholder-amber-900/50 outline-none pb-2 font-mono tracking-widest text-xs transition-colors"
            />

            {error && <p className="text-red-500 text-xs font-mono tracking-widest text-center mt-2">{error}</p>}
        </div>

        <button 
            type="submit" 
            disabled={isLoading}
            className="mt-8 rounded-full border-2 border-amber-500 text-amber-500 font-bold uppercase tracking-[0.3em] text-xs px-8 py-3 hover:bg-amber-500 hover:text-black transition-all duration-300 shadow-[0_0_15px_rgba(245,158,11,0.2)] hover:shadow-[0_0_25px_rgba(245,158,11,0.5)]"
        >
            {isLoading ? 'Condensing...' : 'Ignite'}
        </button>

      </form>
    </div>
  );
}
