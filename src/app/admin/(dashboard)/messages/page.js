export default function SignalReceiverPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
      <header className="border-b border-[#1A2F23] pb-4">
        <h1 className="text-3xl font-bold tracking-widest text-white uppercase">Signal Receiver</h1>
        <p className="text-gray-500 font-mono text-sm mt-2">Incoming Transmissions & Anomalies</p>
      </header>
      <div className="border border-[#1A2F23] border-dashed p-12 text-center text-gray-600 font-mono text-sm">
        [ INBOX LOADED - 0 NEW SIGNALS DETECTED ]
      </div>
    </div>
  );
}
