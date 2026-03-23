"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const QUESTIONS = [
  "How do you currently handle after-hours maintenance requests?",
  "How are lease renewals managed in your portfolio?",
  "What method do you use for tenant background checks?"
];

const OPTIONS = [
  "Manual phone calls and spreadsheets",
  "A dedicated answering service",
  "Basic software with email alerts",
  "Fully automated AI scheduling and dispatch"
];

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const router = useRouter();

  const handleOptionClick = () => {
    if (currentQuestion < QUESTIONS.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      router.push("/results");
    }
  };

  const progress = ((currentQuestion + 1) / QUESTIONS.length) * 100;

  return (
    <main className="relative min-h-screen w-full overflow-hidden flex items-center justify-center p-6">
      <div className="absolute inset-0 z-0">
        <Image 
          src="/images/hero.png" 
          alt="Modern Architecture" 
          fill
          priority
          className="object-cover blur-[48px] scale-105"
        />
        <div className="absolute inset-0 bg-background/40" />
      </div>

      <div className="relative z-10 w-full max-w-[600px] glass-card rounded-[var(--radius-lg)] overflow-hidden">
        <div className="h-1 w-full bg-glass">
          <div 
            className="h-full bg-primary transition-all duration-300 ease-out" 
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="p-10 space-y-8 animate-slide-in">
          <div className="space-y-4">
            <span className="font-body text-xs font-medium uppercase tracking-[0.1em] text-muted">
              Question {currentQuestion + 1} of {QUESTIONS.length}
            </span>
            <h2 className="font-heading text-4xl text-white leading-tight">
              {QUESTIONS[currentQuestion]}
            </h2>
          </div>

          <div className="space-y-3">
            {OPTIONS.map((option, idx) => (
              <button
                key={idx}
                onClick={handleOptionClick}
                className="w-full text-left p-5 font-body text-base text-white/90 glass-card rounded-[var(--radius-md)] border border-transparent transition-all duration-200 hover:bg-[#D4AF37]/10 hover:border-primary hover:text-white group"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
