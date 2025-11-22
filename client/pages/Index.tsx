import CountdownTimer from "@/components/CountdownTimer";

export default function Index() {
  return (
    <div className="min-h-screen w-full bg-black text-zinc-100 overflow-hidden">
      {/* Animated background gradient */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-slate-950 to-black" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-950/2 rounded-full filter blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-red-950/2 rounded-full filter blur-3xl animate-pulse" />
      </div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-20">
        {/* Header section */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16 space-y-4 sm:space-y-6 md:space-y-8 max-w-4xl">
          {/* Main heading */}
          <div className="space-y-4">
            <div className="space-y-4">
              <h1
                className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-tight text-zinc-100 animate-flicker"
                style={{
                  fontWeight: "900",
                  letterSpacing: "-0.02em",
                  fontFamily: "Nosifer",
                }}
              >
                Your Information
              </h1>
              <h2
                className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter text-red-600 leading-tight"
                style={{ fontWeight: "900", fontFamily: "Nosifer" }}
              >
                Will Be Public in
              </h2>
            </div>
          </div>
        </div>

        {/* Timer section */}
        <div className="mb-8 sm:mb-12 md:mb-20 w-full">
          <div className="flex justify-center">
            <CountdownTimer />
          </div>
        </div>

        {/* Bottom text section */}
        <div className="text-center space-y-2 max-w-xl text-sm sm:text-base md:text-lg text-red-600 italic font-semibold">
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
