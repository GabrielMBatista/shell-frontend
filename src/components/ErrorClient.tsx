'use client';

import { AlertCircle, ArrowRight, RefreshCw } from 'lucide-react';
import { useEffect, useState } from 'react';

interface ErrorClientProps {
  statusCode?: number;
  message?: string;
}

const ErrorClient = ({ statusCode, message }: ErrorClientProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isRotating, setIsRotating] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleReset = () => {
    setIsRotating(true);
    setTimeout(() => {
      window.location.reload();
      setIsRotating(false);
    }, 600);
  };
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    setCurrentTime(new Date().toLocaleString());
  }, []);

  return (
    <div
      className={`min-h-screen flex items-center justify-center bg-gradient-to-br from-[var(--color-surface)] to-[var(--color-surface-dark)] p-[var(--space-md)] transition-opacity duration-700 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="max-w-md w-full bg-[var(--color-background)] rounded-[var(--border-radius-lg)] shadow-[var(--shadow-lg)] overflow-hidden">
        <div className="bg-gradient-to-r from-[var(--color-secondary)] to-[var(--color-primary)] p-[var(--space-lg)] flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-[var(--color-background)] opacity-20 rounded-full animate-ping"></div>
            <AlertCircle size={80} className="text-[var(--color-on-surface-dark)] relative z-10" />
          </div>
        </div>

        <div className="p-[var(--space-lg)] md:p-[var(--space-xl)]">
          <h2 className="text-[var(--font-size-lg)] md:text-[var(--font-size-xl)] font-bold text-[var(--color-text)] mb-[var(--space-sm)] text-center">
            Oops! Something went wrong
          </h2>

          <div className="bg-[var(--color-danger)]/10 border-l-4 border-[var(--color-danger)] p-[var(--space-md)] my-[var(--space-md)] rounded-[var(--border-radius-sm)]">
            <p className="text-[var(--font-size-sm)] md:text-[var(--font-size-md)] text-[var(--color-danger)] font-medium">
              {message || 'An unexpected error occurred.'}
            </p>
          </div>

          <p className="text-[var(--color-text)]/70 mb-[var(--space-lg)] text-center">
            Don&#39;t worry, we&#39;ve logged this error and our team is working on it.
          </p>

          <div className="flex flex-col md:flex-row gap-[var(--space-sm)] justify-center">
            <button
              onClick={handleReset}
              className="flex items-center justify-center gap-[var(--space-sm)] px-[var(--space-lg)] py-[var(--space-md)] bg-[var(--color-primary)] text-[var(--color-on-surface-dark)] font-medium rounded-[var(--border-radius-sm)] hover:bg-[var(--color-primary-hover)] transition-colors"
            >
              <RefreshCw size={18} className={`${isRotating ? 'animate-spin' : ''}`} />
              Try Again
            </button>

            <button
              onClick={() => (window.location.href = '/')}
              className="flex items-center justify-center gap-[var(--space-sm)] px-[var(--space-lg)] py-[var(--space-md)] border border-[var(--color-border)] text-[var(--color-text)] font-medium rounded-[var(--border-radius-sm)] hover:bg-[var(--color-hover)] transition-colors"
            >
              Go Home
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        <div className="bg-[var(--color-surface)] px-[var(--space-lg)] py-[var(--space-md)] flex justify-between items-center border-t border-[var(--color-border)]">
          <p className="text-[var(--font-size-sm)] text-[var(--color-text)]/50">
            Error Code: {statusCode || 500}
          </p>
          <p className="text-[var(--font-size-sm)] text-[var(--color-text)]/50">{currentTime}</p>
        </div>
      </div>
    </div>
  );
};

export default ErrorClient;
