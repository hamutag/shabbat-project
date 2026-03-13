"use client";

import { Component, type ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

      return (
        <div className="min-h-[400px] flex items-center justify-center p-8">
          <div className="text-center max-w-md">
            <span className="text-4xl block mb-4">😕</span>
            <h2 className="text-xl font-bold text-[var(--color-blue-deep)] mb-2">
              משהו השתבש
            </h2>
            <p className="text-[var(--color-warm-gray)] mb-4">
              אירעה שגיאה בטעינת הדף. אנא נסה לרענן את העמוד.
            </p>
            <button
              onClick={() => {
                this.setState({ hasError: false });
                window.location.reload();
              }}
              className="btn-primary"
            >
              רענן את העמוד
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Empty state component
export function EmptyState({
  icon = "📭",
  title,
  description,
  action,
}: {
  icon?: string;
  title: string;
  description?: string;
  action?: { label: string; href?: string; onClick?: () => void };
}) {
  return (
    <div className="text-center py-12 px-4">
      <span className="text-5xl block mb-4">{icon}</span>
      <h3 className="text-lg font-bold text-[var(--color-blue-deep)] mb-2">{title}</h3>
      {description && (
        <p className="text-[var(--color-warm-gray)] mb-4 max-w-md mx-auto">{description}</p>
      )}
      {action && (
        action.href ? (
          <a href={action.href} className="btn-primary inline-block">
            {action.label}
          </a>
        ) : (
          <button onClick={action.onClick} className="btn-primary">
            {action.label}
          </button>
        )
      )}
    </div>
  );
}
