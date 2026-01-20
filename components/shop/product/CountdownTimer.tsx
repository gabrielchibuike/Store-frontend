"use client";

import { useEffect, useState } from "react";
import { Clock } from "lucide-react";

interface CountdownTimerProps {
  expiryDate: string;
  onExpire?: () => void;
}

export function CountdownTimer({ expiryDate, onExpire }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
    expired: false,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(expiryDate) - +new Date();

      if (difference <= 0) {
        if (!timeLeft.expired) {
          setTimeLeft((prev) => ({ ...prev, expired: true }));
          onExpire?.();
        }
        return { hours: 0, minutes: 0, seconds: 0, expired: true };
      }

      return {
        hours: Math.floor(difference / (1000 * 60 * 60)),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        expired: false,
      };
    };

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // Initial calculation
    setTimeLeft(calculateTimeLeft());

    return () => clearInterval(timer);
  }, [expiryDate, onExpire, timeLeft.expired]);

  if (timeLeft.expired) return null;

  return (
    <span className="flex items-center gap-2 bg-muted px-3 py-1 rounded-full text-xs md:text-sm font-medium">
      <Clock className="h-4 w-4" /> {timeLeft.hours}h : {timeLeft.minutes}m :{" "}
      {timeLeft.seconds}s
    </span>
  );
}
