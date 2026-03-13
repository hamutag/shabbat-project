import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "success" | "gold" | "blue" | "danger" | "warning";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-gray-100 text-gray-600",
  success: "bg-green-100 text-green-700",
  gold: "bg-amber-100 text-amber-700",
  blue: "bg-blue-100 text-blue-700",
  danger: "bg-red-100 text-red-600",
  warning: "bg-amber-100 text-amber-600",
};

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
