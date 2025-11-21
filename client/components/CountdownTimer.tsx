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
  const [isLoading, setIsLoading] = useState(true);
  const [endTime, setEndTime] = useState<number | null>(null);

  useEffect(() => {
    // Fetch server time to sync the timer and calculate end time once
    const fetchServerTime = async () => {
      try {
        const response = await fetch("/api/time");
        const data = (await response.json()) as { timestamp: number };
        const calculatedEndTime = data.timestamp + 5 * 24 * 60 * 60 * 1000;
        setEndTime(calculatedEndTime);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching server time:", error);
        setIsLoading(false);
      }
    };

    fetchServerTime();
  }, []);

  useEffect(() => {
    if (endTime === null) return;

    const calculateTimeRemaining = () => {
      const now = Date.now();
      const remainingMs = endTime - now;

      if (remainingMs <= 0) {
        setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(remainingMs / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (remainingMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const minutes = Math.floor(
        (remainingMs % (1000 * 60 * 60)) / (1000 * 60),
      );
      const seconds = Math.floor((remainingMs % (1000 * 60)) / 1000);

      setTimeRemaining({ days, hours, minutes, seconds });
    };

    calculateTimeRemaining();

    const interval = setInterval(calculateTimeRemaining, 1000);
    return () => clearInterval(interval);
  }, [endTime]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <div className="animate-pulse text-zinc-500">Loading...</div>
      </div>
    );
  }

  const TimerUnit = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center gap-2">
      <div className="relative">
        {/* Glowing background effect */}
        <div className="absolute inset-0 bg-red-600/20 blur-2xl rounded-lg animate-pulse" />

        {/* Main timer box */}
        <div className="relative bg-zinc-950 border border-red-900/50 rounded-lg px-6 py-8 min-w-20 backdrop-blur-sm hover:border-red-700/70 transition-colors duration-300">
          <div className="text-5xl font-black text-red-500 tracking-tighter font-mono">
            {String(value).padStart(2, "0")}
          </div>
        </div>
      </div>
      <span className="text-xs uppercase tracking-widest text-zinc-500 font-semibold">
        {label}
      </span>
    </div>
  );

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
