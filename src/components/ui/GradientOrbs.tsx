"use client";

interface GradientOrbsProps {
  variant?: "light" | "dark" | "gold" | "rose";
  className?: string;
}

const orbConfigs = {
  light: [
    {
      color: "rgba(197, 150, 46, 0.12)",
      size: "400px",
      position: "top-[-100px] right-[-100px]",
      animation: "animate-[float_8s_ease-in-out_infinite]",
    },
    {
      color: "rgba(27, 58, 92, 0.08)",
      size: "350px",
      position: "bottom-[-80px] left-[-80px]",
      animation: "animate-[float-reverse_10s_ease-in-out_infinite]",
    },
  ],
  dark: [
    {
      color: "rgba(197, 150, 46, 0.15)",
      size: "400px",
      position: "top-[-100px] left-[-100px]",
      animation: "animate-[float_9s_ease-in-out_infinite]",
    },
    {
      color: "rgba(232, 213, 163, 0.1)",
      size: "300px",
      position: "bottom-[-60px] right-[-60px]",
      animation: "animate-[float-reverse_7s_ease-in-out_infinite]",
    },
  ],
  gold: [
    {
      color: "rgba(197, 150, 46, 0.15)",
      size: "350px",
      position: "top-[-80px] right-[-80px]",
      animation: "animate-[float_7s_ease-in-out_infinite]",
    },
    {
      color: "rgba(197, 150, 46, 0.1)",
      size: "250px",
      position: "bottom-[-50px] left-[-50px]",
      animation: "animate-[float-reverse_9s_ease-in-out_infinite]",
    },
  ],
  rose: [
    {
      color: "rgba(245, 230, 224, 0.3)",
      size: "400px",
      position: "top-[-100px] right-[-100px]",
      animation: "animate-[float_8s_ease-in-out_infinite]",
    },
    {
      color: "rgba(197, 150, 46, 0.08)",
      size: "300px",
      position: "bottom-[-60px] left-[-60px]",
      animation: "animate-[float-reverse_10s_ease-in-out_infinite]",
    },
  ],
};

export function GradientOrbs({
  variant = "light",
  className = "",
}: GradientOrbsProps) {
  const orbs = orbConfigs[variant];

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      aria-hidden="true"
    >
      {orbs.map((orb, i) => (
        <div
          key={i}
          className={`absolute ${orb.position} ${orb.animation} rounded-full`}
          style={{
            width: orb.size,
            height: orb.size,
            background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
            filter: "blur(60px)",
          }}
        />
      ))}
    </div>
  );
}
