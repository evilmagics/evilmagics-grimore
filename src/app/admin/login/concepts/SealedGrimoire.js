"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function SealedGrimoire() {
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
      setError("The Seal Rejects You.");
      setIsLoading(false);
    } else {
      router.push("/admin");
    }
  };

  return (
    <div className="w-full h-screen bg-[#0a0a09] flex items-center justify-center relative overflow-hidden font-serif bg-[url('https://grainy-gradients.vercel.app/noise.svg')] blend-overlay">
      {/* Dim spotlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,rgba(180,140,80,0.15)_0%,transparent_50%)] pointer-events-none"></div>

      <div className="relative z-10 bg-[#161412] p-12 w-full max-w-lg border-[6px] border-[#2a241e] rounded-sm shadow-[0_30px_60px_rgba(0,0,0,0.9)]">
        {/* Ornate corner pieces (simulated with CSS) */}
        <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#b48c50]"></div>
        <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#b48c50]"></div>
        <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[#b48c50]"></div>
        <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#b48c50]"></div>

        <div className="text-center mb-10 space-y-4">
          <h2 className="text-[#b48c50] text-2xl uppercase tracking-[0.3em] border-b border-[#b48c50]/20 pb-4">Seal of the Sanctum</h2>
          <p className="text-[#8a7f72] text-sm italic">"Only the architect holds the key."</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[#b48c50] uppercase text-xs tracking-[0.2em]">Incantation (UID)</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full bg-[#0a0a09] border border-[#2a241e] text-[#d4c5b0] px-4 py-3 outline-none focus:border-[#b48c50] transition-colors font-sans"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-[#b48c50] uppercase text-xs tracking-[0.2em]">Sacred Word (Passcode)</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full bg-[#0a0a09] border border-[#2a241e] text-[#b48c50] px-4 py-3 outline-none focus:border-[#b48c50] transition-colors font-sans tracking-widest"
            />
          </div>

          {error && <p className="text-red-900 border border-red-900 bg-red-950/20 px-4 py-2 text-center text-sm">{error}</p>}

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full mt-8 bg-transparent text-[#b48c50] font-bold uppercase tracking-[0.2em] py-4 border-2 border-[#b48c50] hover:bg-[#b48c50] hover:text-black transition-all duration-500"
          >
            {isLoading ? 'Unsealing...' : 'Break The Seal'}
          </button>
        </form>
      </div>
    </div>
  );
}
