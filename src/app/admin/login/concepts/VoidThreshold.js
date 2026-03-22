"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

const loginSchema = z.object({
  email: z.string().email({ message: "INVALID UID FORMAT" }),
  password: z.string().min(1, { message: "ESSENCE REQUIRED" }),
  honeypot: z.string().max(0).optional(),
});

const RUNES = ["ᚢ", "ᚦ", "ᚨ", "ᚱ", "ᚲ", "ᚷ", "ᚹ", "ᚺ", "ᚾ", "ᛁ", "ᛃ", "ᛇ", "ᛈ", "ᛉ", "ᛊ", "ᛏ", "ᛒ", "ᛖ", "ᛗ", "ᛚ", "ᛜ", "ᛟ", "ᛞ"];

export default function VoidThreshold() {
  const [isRevealed, setIsRevealed] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordDisplay, setPasswordDisplay] = useState("");
  const router = useRouter();
  const supabase = createClient();

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "", honeypot: "" },
  });

  const passwordVal = watch("password");

  const handlePasswordChange = (e) => {
    const val = e.target.value;
    setValue("password", val);
    let runes = "";
    for (let i = 0; i < val.length; i++) runes += RUNES[Math.floor(Math.random() * RUNES.length)];
    setPasswordDisplay(runes);
  };

  const onSubmit = async (data) => {
    if (data.honeypot) return;
    setIsLoading(true);
    setErrorMsg(null);
    const { error } = await supabase.auth.signInWithPassword({ email: data.email, password: data.password });
    if (error) {
      setErrorMsg("ERROR 403: UNAUTHORIZED ESSENCE DETECTED");
      setIsLoading(false);
    } else {
      router.push("/admin");
    }
  };

  return (
    <main className="relative z-10 w-full max-w-md p-8 flex flex-col items-center justify-center h-full mx-auto" onClick={() => !isRevealed && setIsRevealed(true)}>
      {isLoading && <motion.div initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ duration: 2, repeat: Infinity }} className="fixed top-0 left-0 h-1 bg-cyan-500 shadow-[0_0_10px_#06b6d4] z-50" />}
      <AnimatePresence>
        {errorMsg && (
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 0.1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className="absolute inset-0 flex items-center justify-center pointer-events-none -translate-y-20 z-0">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-96 h-96 text-white blur-sm">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-2-11.5c0-.83-.67-1.5-1.5-1.5S7 7.67 7 8.5 7.67 10 8.5 10 10 9.33 10 8.5zm5.5-1.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm-5.5 6c-2.33 0-4.31 1.46-5.11 3.5h10.22c-.8-2.04-2.78-3.5-5.11-3.5z"/>
                </svg>
            </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {!isRevealed ? (
          <motion.div key="locked" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-gray-400 tracking-[0.2em] text-sm animate-pulse cursor-pointer uppercase text-center mt-64">
            [ SYSTEM LOCKED. IDENTIFY YOURSELF ]
          </motion.div>
        ) : (
          <motion.div key="form" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }} className={`w-full relative z-10 mt-32 ${errorMsg ? 'animate-[shake_0.5s_ease-in-out]' : ''}`}>
            <div className="backdrop-blur-md bg-white/5 border border-white/10 p-8 rounded-sm shadow-2xl hover:border-white/30 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all duration-500">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                    <div className="space-y-2 group">
                        <label className="text-xs text-gray-500 tracking-widest uppercase group-focus-within:text-cyan-400 transition-colors">[ UID ]</label>
                        <input type="email" {...register("email")} className="w-full bg-transparent border-b border-gray-700 focus:border-cyan-400 outline-none py-2 text-white placeholder-gray-800 transition-colors" placeholder="architect@thevoid.net" autoComplete="off" />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                    </div>
                    <div className="space-y-2 group relative">
                        <label className="text-xs text-gray-500 tracking-widest uppercase group-focus-within:text-cyan-400 transition-colors">[ ESSENCE ]</label>
                        <div className="relative">
                            <input type="text" value={passwordDisplay} onChange={() => {}} className="w-full bg-transparent border-b border-gray-700 focus:border-cyan-400 outline-none py-2 text-cyan-200 tracking-[0.5em] text-lg font-bold pointer-events-none transition-colors" placeholder="..." />
                            <input type="text" className="absolute inset-0 opacity-0 cursor-text" onChange={handlePasswordChange} value={passwordVal} />
                        </div>
                        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                    </div>
                    <input type="text" {...register("honeypot")} className="hidden" tabIndex="-1" />
                    <button type="submit" disabled={isLoading} className={`w-full mt-6 border border-white/20 py-3 tracking-[0.2em] text-sm hover:bg-white/10 transition-all duration-300 ${isLoading ? 'border-cyan-500 text-cyan-400 shadow-[0_0_15px_#06b6d4] animate-pulse' : 'text-gray-300'}`}>
                        {isLoading ? '[ AUTHORIZING... ]' : '[ AUTHORIZE ]'}
                    </button>
                    {errorMsg && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-500 text-xs tracking-widest text-center mt-4 border border-red-900/50 bg-red-950/20 p-2">{errorMsg}</motion.p>}
                </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <style jsx global>{`
        @keyframes shake { 0%, 100% { transform: translateX(0); } 10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); } 20%, 40%, 60%, 80% { transform: translateX(5px); } }
      `}</style>
    </main>
  );
}
