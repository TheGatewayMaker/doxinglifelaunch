import { useEffect, useState } from "react";

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownTimer = () => {
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>({
    days: 7,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    let isMounted = true;
    let intervalId: ReturnType<typeof setInterval> | null = null;

    const initializeTimer = async () => {
      try {
        // Fixed launch date: November 29, 2025 at 5:00 AM UTC
        const launchDate = new Date("2025-11-29T05:00:00Z");
        const endTime = launchDate.getTime();

        if (!isMounted || !endTime) return;

        const updateTimer = () => {
          const now = Date.now();
          const remaining = Math.max(0, endTime - now);
          const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
          const hours = Math.floor(
            (remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
          );
          const minutes = Math.floor(
            (remaining % (1000 * 60 * 60)) / (1000 * 60),
          );
          const seconds = Math.floor((remaining % (1000 * 60)) / 1000);

          setTimeRemaining({ days, hours, minutes, seconds });
        };

        // Update immediately on load
        updateTimer();
        setIsInitialized(true);

        // Set up interval for continuous updates
        intervalId = setInterval(updateTimer, 1000);
      } catch (error) {
        console.error("Error initializing timer:", error);
        if (isMounted) {
          setIsInitialized(true);
        }
      }
    };

    initializeTimer();

    return () => {
      isMounted = false;
      if (intervalId !== null) {
        clearInterval(intervalId);
      }
    };
  }, []);

  if (!isInitialized) {
    return (
      <div className="flex items-center justify-center">
        <div className="animate-pulse text-zinc-500">Loading...</div>
      </div>
    );
  }

  const TimerUnit = ({ value, label }: { value: number; label: string }) => {
    const displayValue = isNaN(value) ? 0 : value;
    return (
      <div className="flex flex-col items-center gap-2">
        <div className="relative">
          {/* Glowing background effect */}
          <div className="absolute inset-0 bg-red-600/20 blur-2xl rounded-lg animate-pulse" />

          {/* Main timer box */}
          <div className="relative bg-black border border-red-950/80 rounded-lg px-3 sm:px-6 md:px-8 py-4 sm:py-6 md:py-10 min-w-16 sm:min-w-20 md:min-w-24 backdrop-blur-sm hover:border-red-600/80 transition-colors duration-300">
            <div className="text-3xl sm:text-5xl md:text-7xl font-black text-red-600 tracking-tighter font-mono">
              {String(displayValue).padStart(2, "0")}
            </div>
          </div>
        </div>
        <span className="text-xs sm:text-sm md:text-lg uppercase tracking-widest text-zinc-500 font-black">
          {label}
        </span>
      </div>
    );
  };

  return (
    <div className="flex items-center justify-center gap-1 sm:gap-2 md:gap-3 lg:gap-6 flex-wrap">
      <TimerUnit value={timeRemaining.days} label="Days" />

      {/* Separator */}
      <div className="text-4xl md:text-5xl font-black text-red-600 animate-pulse">
        :
      </div>

      <TimerUnit value={timeRemaining.hours} label="Hours" />

      {/* Separator */}
      <div className="text-4xl md:text-5xl font-black text-red-600 animate-pulse">
        :
      </div>

      <TimerUnit value={timeRemaining.minutes} label="Minutes" />

      {/* Separator */}
      <div className="text-4xl md:text-5xl font-black text-red-600 animate-pulse">
        :
      </div>

      <TimerUnit value={timeRemaining.seconds} label="Seconds" />
    </div>
  );
};

export default CountdownTimer;
