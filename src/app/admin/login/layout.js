export const metadata = {
  title: 'The Inner Sanctum | Authentication',
  robots: {
    index: false,
    follow: false,
  },
};

export default function LoginLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-hidden font-mono flex items-center justify-center relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(20,20,30,0.8)_0%,rgba(5,5,5,1)_70%)] pointer-events-none" />
      {/* Fog effect overlay */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>
      {children}
    </div>
  );
}
