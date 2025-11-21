import CountdownTimer from "@/components/CountdownTimer";

export default function Index() {
  return (
    <div className="min-h-screen w-full bg-black text-zinc-100 overflow-hidden">
      {/* Animated background gradient */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-zinc-950 to-black" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-950/5 rounded-full filter blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-red-950/5 rounded-full filter blur-3xl animate-pulse" />
      </div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-20">
        {/* Header section */}
        <div className="text-center mb-16 space-y-6 max-w-2xl">
          {/* Main heading */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-zinc-100 animate-flicker">
              Your Information
            </h1>
            <div className="h-1 w-32 bg-gradient-to-r from-red-600 via-red-500 to-red-950 mx-auto" />
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-red-500">
              Will Be Public
            </h2>
          </div>
        </div>

        {/* Timer section */}
        <div className="mb-20 w-full">
          <div className="flex justify-center">
            <CountdownTimer />
          </div>
        </div>

        {/* Bottom text section */}
        <div className="text-center space-y-2 max-w-xl text-xs md:text-sm text-zinc-600 italic">
          <p>The clock is ticking. Every second counts.</p>
        </div>

        {/* Floating elements for atmosphere */}
        <div className="absolute bottom-10 left-10 w-2 h-2 bg-red-600/30 rounded-full animate-pulse" />
        <div
          className="absolute top-20 right-10 w-3 h-3 bg-red-600/20 rounded-full animate-pulse"
          style={{ animationDelay: "0.5s" }}
        />
        <div
          className="absolute bottom-1/3 left-1/4 w-1 h-1 bg-red-500/40 rounded-full animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

      {/* Scanning line effect */}
      <div className="fixed inset-0 pointer-events-none z-20 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white to-transparent animate-pulse" />
      </div>
    </div>
  );
}
