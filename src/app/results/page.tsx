"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Lock, ArrowRight } from "lucide-react";

// ── Score → tier data ────────────────────────────────────────────
interface Tier {
  label: string;
  percentile: string;
  bottom: boolean;
  loss: string;
  leadResponse: { you: string; youPct: number; top: string; topPct: number };
  maintenance:  { you: string; youPct: number; top: string; topPct: number };
  leaseRenewals:{ you: string; youPct: number; top: string; topPct: number };
}

function getTier(score: number): Tier {
  if (score >= 75) return {
    label: "Leader",
    percentile: "top 15%", bottom: false,
    loss: "$30,000",
    leadResponse:  { you: "< 30 min", youPct: 82, top: "< 5 min",  topPct: 96 },
    maintenance:   { you: "80% AI",   youPct: 80, top: "90% AI",   topPct: 90 },
    leaseRenewals: { you: "88%",       youPct: 88, top: "95%",      topPct: 95 },
  };
  if (score >= 50) return {
    label: "Developing",
    percentile: "bottom 40%", bottom: true,
    loss: "$90,000",
    leadResponse:  { you: "2 hrs",  youPct: 48, top: "< 5 min",  topPct: 96 },
    maintenance:   { you: "45% AI", youPct: 45, top: "90% AI",   topPct: 90 },
    leaseRenewals: { you: "75%",    youPct: 75, top: "95%",      topPct: 95 },
  };
  if (score >= 25) return {
    label: "At Risk",
    percentile: "bottom 20%", bottom: true,
    loss: "$180,000",
    leadResponse:  { you: "4 hrs",  youPct: 30, top: "< 5 min",  topPct: 96 },
    maintenance:   { you: "Manual", youPct: 22, top: "90% AI",   topPct: 90 },
    leaseRenewals: { you: "60%",    youPct: 60, top: "95%",      topPct: 95 },
  };
  return {
    label: "Early Stage",
    percentile: "bottom 5%", bottom: true,
    loss: "$240,000",
    leadResponse:  { you: "8+ hrs", youPct: 12, top: "< 5 min",  topPct: 96 },
    maintenance:   { you: "Manual", youPct: 8,  top: "90% AI",   topPct: 90 },
    leaseRenewals: { you: "45%",    youPct: 45, top: "95%",      topPct: 95 },
  };
}

// Circle circumference for r=45: 2π×45 ≈ 283
const CIRC = 283;

// ── Component ────────────────────────────────────────────────────
export default function Results() {
  const [score, setScore]           = useState<number | null>(null);
  const [showDashboard, setShowDashboard] = useState(false);
  const [email, setEmail]           = useState("");
  const [note, setNote]             = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("scorecard_score");
    setScore(saved !== null ? Number(saved) : 42); // fallback for direct nav
  }, []);

  if (showDashboard && score !== null) {
    return <Dashboard score={score} />;
  }

  return (
    <main className="relative min-h-screen w-full overflow-hidden flex items-center justify-center p-6">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero.png"
          alt="Background"
          fill
          priority
          className="object-cover blur-[48px] scale-105"
        />
        <div className="absolute inset-0 bg-background/50" />
      </div>

      <div className="relative z-10 w-full max-w-[560px] glass-card rounded-[var(--radius-lg)] p-10 md:p-12 animate-fade-in">
        <span className="font-body text-[11px] font-medium uppercase tracking-[0.2em] text-primary mb-6 block">
          Your recon report is ready
        </span>
        <h2 className="font-heading text-[36px] md:text-[42px] text-white uppercase leading-tight mb-4">
          Your analysis is ready.
        </h2>
        <p className="font-body text-sm text-muted mb-8 leading-relaxed">
          Enter your email to unlock your automation score, peer comparison, and custom recommendations for your operation.
        </p>

        <form
          onSubmit={(e) => { e.preventDefault(); setShowDashboard(true); }}
          className="space-y-4"
        >
          <input
            type="email"
            required
            placeholder="Your work email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-[52px] px-4 font-body text-sm text-white bg-black/40 border border-glass-border rounded-[var(--radius-md)] focus:outline-none focus:border-primary transition-colors placeholder:text-muted/60"
          />

          {/* Q15 */}
          <div>
            <label className="font-body text-[11px] uppercase tracking-[0.15em] text-muted mb-2 block">
              Before we reach out — anything we should know? <span className="normal-case tracking-normal">(Optional)</span>
            </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Tell us about your situation, your current setup, or what you've already tried..."
              rows={3}
              className="w-full px-4 py-3 font-body text-sm text-white bg-black/40 border border-glass-border rounded-[var(--radius-md)] focus:outline-none focus:border-primary transition-colors placeholder:text-muted/50 resize-none"
            />
          </div>

          <button
            type="submit"
            className="group w-full h-[60px] bg-primary text-black font-body font-bold text-[12px] uppercase tracking-[0.12em] rounded-[var(--radius-md)] hover:brightness-110 transition-all shadow-[0_4px_16px_rgba(212,175,55,0.25)] flex items-center justify-center gap-2"
          >
            Reveal My Score <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </form>

        <div className="mt-6 flex items-center justify-center gap-2 text-muted font-body text-[12px]">
          <Lock className="w-3.5 h-3.5" />
          <span>No spam. No sales calls. Just your results.</span>
        </div>
      </div>
    </main>
  );
}

// ── Dashboard ────────────────────────────────────────────────────
function Dashboard({ score }: { score: number }) {
  const tier   = getTier(score);
  const offset = CIRC * (1 - score / 100);

  return (
    <main className="relative min-h-screen w-full overflow-hidden flex items-center justify-center p-6 lg:p-10">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero.png"
          alt="Background"
          fill
          priority
          className="object-cover blur-[64px] scale-110"
        />
        <div className="absolute inset-0 bg-background/65" />
      </div>

      <div className="relative z-10 w-full max-w-5xl glass-card rounded-[var(--radius-lg)] flex flex-col md:flex-row animate-fade-in divide-y md:divide-y-0 md:divide-x divide-glass-border">

        {/* ── Left: Score ── */}
        <div className="flex-1 p-10 lg:p-14 flex flex-col items-center text-center justify-center">
          <div className="relative w-44 h-44 mb-8">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="6" />
              <circle
                cx="50" cy="50" r="45"
                fill="none"
                stroke="var(--color-primary)"
                strokeWidth="6"
                strokeDasharray={CIRC}
                strokeDashoffset={offset}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-heading text-[3.5rem] leading-none text-white">{score}</span>
              <span className="font-body text-[0.6rem] tracking-[0.2em] text-muted uppercase">out of 100</span>
            </div>
          </div>

          <div className="mb-2">
            <span className="font-body text-[11px] font-medium uppercase tracking-[0.2em] text-primary">
              {tier.label}
            </span>
          </div>

          <h3 className="font-heading text-[26px] lg:text-[30px] text-white leading-tight mb-5 uppercase">
            You are in the{" "}
            <span className="text-primary">{tier.percentile}</span>{" "}
            of modern property managers.
          </h3>

          <p className="font-body text-sm text-muted leading-relaxed max-w-[260px]">
            You are leaving an estimated{" "}
            <span className="text-white font-medium">{tier.loss}</span>{" "}
            on the table annually due to manual inefficiencies in your workflow.
          </p>
        </div>

        {/* ── Right: Comparison ── */}
        <div className="flex-1 p-10 lg:p-14 flex flex-col">
          <div className="flex items-center justify-between mb-10">
            <h3 className="font-heading text-[22px] text-white uppercase">Peer Comparison</h3>
            <div className="flex items-center gap-4 text-[11px] font-body uppercase tracking-wider">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-white/30" />
                <span className="text-muted">You</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                <span className="text-muted">Leaders</span>
              </div>
            </div>
          </div>

          <div className="space-y-8 flex-1">
            <CompareRow
              label="Lead Response Time"
              you={tier.leadResponse.you}
              youPct={tier.leadResponse.youPct}
              top={tier.leadResponse.top}
              topPct={tier.leadResponse.topPct}
            />
            <CompareRow
              label="Maintenance Automation"
              you={tier.maintenance.you}
              youPct={tier.maintenance.youPct}
              top={tier.maintenance.top}
              topPct={tier.maintenance.topPct}
            />
            <CompareRow
              label="Lease Renewals"
              you={tier.leaseRenewals.you}
              youPct={tier.leaseRenewals.youPct}
              top={tier.leaseRenewals.top}
              topPct={tier.leaseRenewals.topPct}
            />
          </div>

          <div className="mt-10 pt-8 border-t border-glass-border flex flex-col items-center gap-4">
            <p className="font-body text-sm text-muted text-center">
              Stop losing revenue to outdated processes.
            </p>
            <a
              href="https://calendar.app.google/uyDsV1SVF8JbJWv36"
              target="_blank"
              rel="noopener noreferrer"
              className="group w-full h-[56px] bg-primary text-black font-body font-bold text-[12px] uppercase tracking-[0.12em] rounded-[var(--radius-md)] hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(212,175,55,0.2)]"
            >
              Book a Strategy Call <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>

      </div>
    </main>
  );
}

// ── Comparison row helper ─────────────────────────────────────────
function CompareRow({
  label, you, youPct, top, topPct,
}: {
  label: string;
  you: string; youPct: number;
  top: string; topPct: number;
}) {
  return (
    <div className="space-y-2.5">
      <p className="font-body text-sm text-white">{label}</p>
      <div className="space-y-1.5">
        <div className="flex items-center gap-3 text-[11px] font-body">
          <span className="w-8 text-muted shrink-0">You</span>
          <div className="flex-1 h-2.5 rounded-full bg-white/5">
            <div className="h-full bg-white/30 rounded-full" style={{ width: `${youPct}%` }} />
          </div>
          <span className="w-20 text-white shrink-0">{you}</span>
        </div>
        <div className="flex items-center gap-3 text-[11px] font-body">
          <span className="w-8 text-primary/80 shrink-0">Top</span>
          <div className="flex-1 h-2.5 rounded-full bg-white/5">
            <div className="h-full bg-primary rounded-full" style={{ width: `${topPct}%` }} />
          </div>
          <span className="w-20 text-primary shrink-0">{top}</span>
        </div>
      </div>
    </div>
  );
}
