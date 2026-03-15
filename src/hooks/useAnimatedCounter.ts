"use client";

import { useEffect, useState } from "react";

export function useAnimatedCounter(
  target: number,
  isVisible: boolean,
  duration = 2000
) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible || target === 0) return;

    let animationFrame: number;
    const start = Date.now();

    const step = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutExpo curve for satisfying deceleration
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.round(target * eased));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(step);
      }
    };

    animationFrame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrame);
  }, [isVisible, target, duration]);

  return count;
}
