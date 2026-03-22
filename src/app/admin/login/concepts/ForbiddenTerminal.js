"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function ForbiddenTerminal() {
  const [step, setStep] = useState(0); // 0: input email, 1: input password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorLine, setErrorLine] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [step]);

  const handleKeyDown = async (e) => {
    if (e.key === "Enter") {
      if (step === 0 && email.trim() !== "") {
        setStep(1);
      } else if (step === 1 && password.trim() !== "") {
        setIsLoading(true);
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
          setErrorLine("[ ACCESS DENIED: MANA INSUFFICIENT ]");
          setIsLoading(false);
          setStep(0);
          setEmail("");
          setPassword("");
        } else {
          router.push("/admin");
        }
      }
    }
  };

  return (
    <div 
      className="w-full h-screen bg-[#020202] text-[#0f0] font-mono p-8 text-sm outline-none overflow-hidden"
      onClick={() => inputRef.current?.focus()}
    >
      {/* CRT Scanline Effect */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] z-50 mix-blend-overlay"></div>
      
      <div className="relative z-10 max-w-2xl mx-auto mt-12 space-y-2">
        <p>THE SILENT ARCHITECT&apos;S GRIMOIRE [Version 1.0.4]</p>
        <p>(c) The Void Threshold. All rights reserved.</p>
        <br />
        <p className="opacity-70">Starting kernel sequence...</p>
        <p className="opacity-70">Loading forbidden constructs... [OK]</p>
        <br />
        
        {errorLine && (
            <div className="text-red-500 my-4 animate-pulse">
                <pre>{`
    .@@@@@@@@@@.    
  @@@@@@@@@@@@@@@@  
 @@@@@@@@@@@@@@@@@@ 
 @@@@@@@@@@@@@@@@@@ 
 @@@    @@@@    @@@ 
 @@@    @@@@    @@@ 
 @@@@@@@@@@@@@@@@@@ 
  @@@@  @@@@  @@@@  
   @@@@@@@@@@@@@@   
`}</pre>
                <p className="mt-2">{errorLine}</p>
            </div>
        )}

        <div className="space-y-2">
          <p>&gt; AUTHENTICATE ENTITY</p>
          <div className="flex gap-2">
            <span>&gt; IDENTIFIER:</span>
            {step === 0 ? (
              <input
                ref={inputRef}
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={handleKeyDown}
                className="bg-transparent text-[#0f0] outline-none flex-1"
                spellCheck={false}
                autoFocus
                disabled={isLoading}
              />
            ) : (
              <span>{email}</span>
            )}
          </div>
          
          {step === 1 && (
            <div className="flex gap-2 mt-2">
              <span>&gt; INJECT ESSENCE:</span>
              <input
                ref={inputRef}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handleKeyDown}
                className="bg-transparent text-red-500 outline-none flex-1 tracking-[0.5em]"
                spellCheck={false}
                autoFocus
                disabled={isLoading}
              />
            </div>
          )}

          {isLoading && (
            <div className="mt-4 text-[#0f0] animate-pulse">
              &gt; VERIFYING SIGNATURE...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
