import { useEffect, useState } from "react";

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownTimer = () => {
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>({
    days: 5,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const initializeTimer = async () => {
      try {
        // Check localStorage first
        const stored = localStorage.getItem("countdownEndTime");
        let endTime: number | null = null;

        if (stored) {
          const parsed = parseInt(stored, 10);
          if (!isNaN(parsed) && parsed > Date.now()) {
            endTime = parsed;
          } else {
            // Clear invalid or expired data
            localStorage.removeItem("countdownEndTime");
          }
        }

        // If no valid stored time, fetch from server
        if (!endTime) {
          const response = await fetch("/api/time");
          const data = (await response.json()) as { timestamp: number };
          endTime = data.timestamp + 5 * 24 * 60 * 60 * 1000;
          localStorage.setItem("countdownEndTime", endTime.toString());
        }

        if (isMounted) {
          // Update immediately
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
          setIsInitialized(true);

          // Set up interval for continuous updates
          const interval = setInterval(() => {
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
          }, 1000);

          return () => clearInterval(interval);
        }
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
          <div className="relative bg-zinc-950 border border-red-900/50 rounded-lg px-6 py-8 min-w-20 backdrop-blur-sm hover:border-red-700/70 transition-colors duration-300">
            <div className="text-5xl font-black text-red-500 tracking-tighter font-mono">
              {String(displayValue).padStart(2, "0")}
            </div>
          </div>
        </div>
        <span className="text-xs uppercase tracking-widest text-zinc-500 font-semibold">
          {label}
        </span>
      </div>
    );
  };

  return (
    <div className="flex items-center justify-center gap-3 md:gap-6 flex-wrap">
      <TimerUnit value={timeRemaining.days} label="Days" />

      {/* Separator */}
      <div className="text-2xl md:text-4xl font-black text-red-600/60 animate-pulse">
        :
      </div>

      <TimerUnit value={timeRemaining.hours} label="Hours" />

      {/* Separator */}
      <div className="text-2xl md:text-4xl font-black text-red-600/60 animate-pulse">
        :
      </div>

      <TimerUnit value={timeRemaining.minutes} label="Minutes" />

      {/* Separator */}
      <div className="text-2xl md:text-4xl font-black text-red-600/60 animate-pulse">
        :
      </div>

      <TimerUnit value={timeRemaining.seconds} label="Seconds" />
    </div>
  );
};

export default CountdownTimer;
