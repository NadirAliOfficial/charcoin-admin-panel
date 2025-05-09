"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MoveLeft, Rocket } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-background to-muted px-4 text-center">
      <div className="space-y-8 max-w-md">
        <div className="relative flex items-center justify-center">
          <div className="absolute  -top-1 left-[calc(50%-50px)]   w-24 h-24 bg-primary/20 rounded-full blur-xl animate-pulse" />
          <div className="relative z-10 flex items-center justify-center w-24 h-24 mx-auto rounded-full ">
            <Rocket className="h-12 w-12 text-primary " />
          </div>
        </div>

        <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight">
          404
        </h1>

        <div className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold">
            Houston, we have a problem!
          </h2>
          <p className="text-muted-foreground">
            The page you&apos;re looking for has been lost in space or never existed.
          </p>
        </div>

        <div className="pt-4">
          <Button asChild size="lg" className="gap-2">
            <Link href="/">
              <MoveLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>

        <div className="absolute bottom-10 left-0  right-0 flex justify-center space-x-3">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-1 h-1 rounded-full bg-primary/60"
              style={{
                animation: `twinkle ${
                  2 + Math.random() * 3
                }s ease-in-out infinite ${Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes twinkle {
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
