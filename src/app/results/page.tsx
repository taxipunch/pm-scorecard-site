"use client";

import { useState } from "react";
import Image from "next/image";
import { Lock, ArrowRight } from "lucide-react";

export default function Results() {
  const [showResults, setShowResults] = useState(false);
  const [email, setEmail] = useState("");

  if (showResults) {
    return <Dashboard />;
  }

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
        <div className="absolute inset-0 bg-background/50" />
      </div>

      <div className="relative z-10 w-full max-w-[600px] glass-card rounded-[var(--radius-lg)] p-12 text-center">
        <h2 className="font-heading text-5xl text-white mb-6">Your analysis is ready.</h2>
        <p className="font-body text-muted text-lg mb-8">
          Enter your email to see your automation score, peer comparison, and custom 90-day implementation roadmap.
        </p>

        <form onSubmit={(e) => { e.preventDefault(); setShowResults(true); }} className="space-y-6">
          <input 
            type="email" 
            required
            placeholder="Enter your work email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-[56px] px-4 font-body text-white bg-black/40 border border-glass-border rounded-[var(--radius-md)] focus:outline-none focus:border-primary transition-colors placeholder:text-muted"
          />
          <button 
            type="submit"
            className="w-full h-[64px] bg-primary text-white font-body font-semibold uppercase tracking-[0.1em] rounded-[var(--radius-md)] hover:brightness-110 transition-all shadow-glass"
          >
            Reveal My Score
          </button>
        </form>

        <div className="mt-8 flex items-center justify-center gap-2 text-muted font-body text-sm">
          <Lock className="w-4 h-4" />
          <span>We respect your privacy. Secure 256-bit encryption.</span>
        </div>
      </div>
    </main>
  );
}

function Dashboard() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden flex items-center justify-center p-6 lg:p-12">
      <div className="absolute inset-0 z-0">
        <Image 
          src="/images/hero.png" 
          alt="Modern Architecture" 
          fill
          priority
          className="object-cover blur-[64px] scale-110"
        />
        <div className="absolute inset-0 bg-background/60" />
      </div>

      <div className="relative z-10 w-full max-w-5xl glass-card rounded-[var(--radius-lg)] flex flex-col md:flex-row animate-fade-in divide-y md:divide-y-0 md:divide-x divide-glass-border">
        {/* Left Column: Score */}
        <div className="flex-1 p-10 lg:p-14 flex flex-col items-center text-center justify-center">
          <div className="relative w-48 h-48 mb-10">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" fill="none" stroke="#4A5568" strokeWidth="6" />
              <circle 
                cx="50" cy="50" r="45" 
                fill="none" 
                stroke="var(--color-primary)" 
                strokeWidth="6" 
                strokeDasharray="283" 
                strokeDashoffset="155.65"
                strokeLinecap="round"
                className="transition-all duration-1500 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center pt-2">
              <span className="font-heading text-[4rem] leading-none text-white mb-1">45</span>
              <span className="font-body text-[0.65rem] tracking-[0.2em] text-[#828b9c] uppercase">OUT OF 100</span>
            </div>
          </div>
          
          <h3 className="font-heading text-3xl lg:text-4xl text-white mb-6 leading-tight max-w-[300px]">
            You are in the <span className="text-primary">bottom<br />20%</span> of modern<br />property managers.
          </h3>
          
          <p className="font-body text-[#828b9c] text-[0.9rem] max-w-[280px] leading-[1.6]">
            You are leaving an estimated <span className="text-white font-medium">$120,000</span> on<br />the table annually due to manual<br />inefficiencies in your workflow.
          </p>
        </div>

        {/* Right Column: Comparison */}
        <div className="flex-1 p-10 lg:p-14 flex flex-col">
          <div className="flex items-center justify-between mb-12">
            <h3 className="font-heading text-2xl text-white">Peer Comparison</h3>
            <div className="flex items-center gap-4 text-xs font-body uppercase tracking-wider text-muted">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#4A5568]"></span>
                <span className="text-white">You</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-primary"></span>
                <span className="text-white">Leaders</span>
              </div>
            </div>
          </div>

          <div className="space-y-8 flex-1">
            {/* Metric 1 */}
            <div className="space-y-3">
              <p className="font-body text-sm text-white">Lead Response Time</p>
              <div className="space-y-2">
                <div className="flex items-center text-xs font-body">
                  <span className="w-10 text-muted">You</span>
                  <div className="flex-1 h-3 rounded-full bg-white/5 relative">
                    <div className="absolute top-0 left-0 h-full bg-[#4A5568] rounded-full" style={{ width: '30%' }}></div>
                  </div>
                  <span className="w-20 pl-4 text-left text-white">4 hrs</span>
                </div>
                <div className="flex items-center text-xs font-body">
                  <span className="w-10 text-primary/80">Top</span>
                  <div className="flex-1 h-3 rounded-full bg-white/5 relative">
                    <div className="absolute top-0 left-0 h-full bg-primary rounded-full" style={{ width: '90%' }}></div>
                  </div>
                  <span className="w-20 pl-4 text-left text-primary">&lt;5 min</span>
                </div>
              </div>
            </div>

            {/* Metric 2 */}
            <div className="space-y-3">
              <p className="font-body text-sm text-white">Maintenance Automation</p>
              <div className="space-y-2">
                <div className="flex items-center text-xs font-body">
                  <span className="w-10 text-muted">You</span>
                  <div className="flex-1 h-3 rounded-full bg-white/5 relative">
                    <div className="absolute top-0 left-0 h-full bg-[#4A5568] rounded-full" style={{ width: '40%' }}></div>
                  </div>
                  <span className="w-20 pl-4 text-left text-white">Manual</span>
                </div>
                <div className="flex items-center text-xs font-body">
                  <span className="w-10 text-primary/80">Top</span>
                  <div className="flex-1 h-3 rounded-full bg-white/5 relative">
                    <div className="absolute top-0 left-0 h-full bg-primary rounded-full" style={{ width: '85%' }}></div>
                  </div>
                  <span className="w-20 pl-4 text-left text-primary">85% AI</span>
                </div>
              </div>
            </div>

            {/* Metric 3 */}
            <div className="space-y-3">
              <p className="font-body text-sm text-white">Lease Renewals</p>
              <div className="space-y-2">
                <div className="flex items-center text-xs font-body">
                  <span className="w-10 text-muted">You</span>
                  <div className="flex-1 h-3 rounded-full bg-white/5 relative">
                    <div className="absolute top-0 left-0 h-full bg-[#4A5568] rounded-full" style={{ width: '60%' }}></div>
                  </div>
                  <span className="w-20 pl-4 text-left text-white">60%</span>
                </div>
                <div className="flex items-center text-xs font-body">
                  <span className="w-10 text-primary/80">Top</span>
                  <div className="flex-1 h-3 rounded-full bg-white/5 relative">
                    <div className="absolute top-0 left-0 h-full bg-primary rounded-full" style={{ width: '92%' }}></div>
                  </div>
                  <span className="w-20 pl-4 text-left text-primary">92%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-glass-border flex flex-col items-center">
            <p className="font-body text-sm text-[#828b9c] mb-6">
              Stop losing revenue to outdated processes.
            </p>
            <button className="w-full h-[56px] bg-primary text-black font-body font-bold uppercase tracking-[0.1em] rounded-[var(--radius-md)] hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-glass hover:gap-3 group">
              Book a Strategy Call <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
