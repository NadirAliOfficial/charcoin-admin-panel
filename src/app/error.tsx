"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlertTriangle, ArrowLeftIcon, Rotate3DIcon, RotateCcw, RotateCcwSquare, RotateCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "@mynaui/icons-react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  const [isResetLoading, setIsResetLoading] = useState(false);

  const handleReset = async () => {
    setIsResetLoading(true);
    await reset();
    setIsResetLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-background to-muted px-4 text-center">
      <div className="space-y-8 max-w-md">
        {/* Error Icon */}
        <div className="relative">
          <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-24 h-24 bg-destructive/20 rounded-full blur-xl animate-pulse" />
          <div className="relative z-10 flex items-center justify-center w-24 h-24 mx-auto rounded-full">
            <AlertTriangle className="h-12 w-12 text-destructive" />
          </div>
        </div>

        {/* Error Message */}
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">Oops!</h1>
        <div className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold">Something went wrong</h2>
          <p className="text-muted-foreground">
            We encountered an unexpected error while processing your request.
          </p>
          {error.digest && (
            <p className="text-xs text-muted-foreground">Error ID: {error.digest}</p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={handleReset} variant="default" size="lg" disabled={isResetLoading} startIcon={RotateCw} iconProps={{
            className: cn("h-4 w-4 " ,isResetLoading && "animate-spin")
          }}>

Try Again
          </Button>
          <Button asChild variant={"newly_darken"} size="lg" startIcon={ArrowLeftIcon}  >
            <Link href="/">Back to Home</Link>
          </Button>
        </div>

        {/* Animated Dots */}
        <div className="absolute bottom-10 left-0 right-0 flex justify-center space-x-3">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-1 h-1 rounded-full bg-destructive/60"
              style={{
                animation: `pulse ${2 + Math.random() * 3}s ease-in-out infinite ${Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes pulse {
          0%,
          100% {
            opacity: 0.2;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.5);
          }
        }
      `}</style>
    </div>
  );
}
