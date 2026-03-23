"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";

// ── Scoring weights ──────────────────────────────────────────────
const HIGH = 12; // 6 high-impact questions × 12 = 72
const MED  = 7;  // 4 medium questions       × 7  = 28  → max 100

// ── Question definitions ─────────────────────────────────────────
type QType = "yesno" | "single" | "multi" | "multi-open";

interface Question {
  id: number;
  scored: boolean;
  impact?: "high" | "medium";
  type: QType;
  text: string;
  yesIsGood?: boolean;   // yesno only — false means "Yes" is the bad answer
  yesLabel?: string;     // optional override for Yes button label
  noLabel?: string;      // optional override for No button label
  options?: string[];
  openFieldLabel?: string;
}

const QUESTIONS: Question[] = [
  {
    id: 1, scored: true, impact: "high", type: "yesno", yesIsGood: true,
    text: "When a tenant contacts you with a problem, can you have the right vendor dispatched and confirmed on the job — in under a minute — from wherever you are, without making a single phone call?",
  },
  {
    id: 2, scored: true, impact: "medium", type: "yesno", yesIsGood: true,
    text: "Right now, without opening three different screens or asking anyone — do you know exactly what's active, what's pending, and what's overdue across every property you manage?",
  },
  {
    id: 3, scored: true, impact: "high", type: "yesno", yesIsGood: true,
    text: "When a vendor leaves a job unfinished, does the wrong job, or does the job wrong — do you find out within the hour?",
  },
  {
    id: 4, scored: true, impact: "medium", type: "yesno", yesIsGood: true,
    text: "When a tenant moves in, renews, or moves out — do the right documents land in your inbox, prefilled and ready to send, without anyone having to build or chase them down?",
  },
  {
    id: 5, scored: true, impact: "high", type: "yesno", yesIsGood: true,
    text: "When a pipe bursts at 10pm on a Sunday, does your system have the right vendor dispatched, confirmed on the job, and uploading a 'before' video — without you making a single phone call?",
  },
  {
    id: 6, scored: true, impact: "medium", type: "yesno", yesIsGood: false,
    text: "When a vendor invoice comes in, do you have to choose between taking their word for it — or driving out to inspect the work yourself?",
  },
  {
    id: 7, scored: true, impact: "high", type: "yesno", yesIsGood: true,
    yesLabel: "System flagged it",
    noLabel: "Tenant called first",
    text: "When a vendor doesn't show, do you find out because your system flagged a missing 'before' video check-in — or because the tenant called you first?",
  },
  {
    id: 8, scored: true, impact: "medium", type: "yesno", yesIsGood: true,
    text: "For your top five vendors, do you have an objective record of their response times, check-in history, and job completion — built automatically, without anyone tracking it manually?",
  },
  {
    id: 9, scored: true, impact: "high", type: "yesno", yesIsGood: true,
    text: "When an owner disputes a charge, has your system already proactively notified you and compiled the document and video justification you need to defend it?",
  },
  {
    id: 10, scored: true, impact: "high", type: "yesno", yesIsGood: true,
    text: "Think back to your last five major headaches. Did your system flag even one of them — with the info and ammunition you needed — in time to actually do something about it?",
  },
  // ── Qualifying ──────────────────────────────────────────────────
  {
    id: 11, scored: false, type: "single",
    text: "Which best describes your business?",
    options: [
      "Property management / real estate",
      "Short-term rental (Airbnb / VRBO)",
      "Restaurant, café, or food service",
      "Retail or personal services (salon, gym, studio)",
      "Professional office (law, insurance, finance)",
      "Other physical-space business",
    ],
  },
  {
    id: 12, scored: false, type: "multi",
    text: "What's the outcome you're actually after in the next 12 months? Pick as many as apply.",
    options: [
      "Get the same quality work done with less stress and fewer fires",
      "Grow without adding more staff or compromising on quality or reputation",
      "Eliminate 90% of in-field work while still meeting or exceeding your standards",
      "Improve profit margins and property values",
    ],
  },
  {
    id: 13, scored: false, type: "multi-open",
    text: "When it comes to managing vendors and staying on top of your properties — what have you tried that hasn't worked the way you hoped?",
    options: [
      "Software that promised automation but still needed someone to babysit it",
      "Hiring staff or a coordinator to handle the follow-up",
      "Building my own systems — checklists, spreadsheets, SOPs",
      "I haven't tried much — I've mostly just absorbed the workload myself",
    ],
    openFieldLabel: "Other:",
  },
  {
    id: 14, scored: false, type: "single",
    text: "If the right solution existed, which of these would fit how you operate?",
    options: [
      "Done-for-you setup — I want it built and running, I just want to use it",
      "Done-with-you — I want to understand it and have some control over how it works",
      "A toolkit I can implement myself with the right guidance",
      "I'm not sure yet — I'd want to see what's possible first",
    ],
  },
];

const TOTAL = QUESTIONS.length; // 14

// ── Component ────────────────────────────────────────────────────
export default function Quiz() {
  const [currentQ, setCurrentQ]         = useState(0);
  const [score, setScore]               = useState(0);
  const [singleSel, setSingleSel]       = useState("");
  const [multiSel, setMultiSel]         = useState<string[]>([]);
  const [openValue, setOpenValue]       = useState("");
  const [qualifying, setQualifying]     = useState<Record<string, unknown>>({});
  const router = useRouter();

  const q        = QUESTIONS[currentQ];
  const progress = ((currentQ + 1) / TOTAL) * 100;
  const isQualifyingSection = currentQ >= 10; // Q11-Q14

  // ── Advance logic ──────────────────────────────────────────────
  function goNext(newScore: number, newQualifying: Record<string, unknown>) {
    if (currentQ < TOTAL - 1) {
      setCurrentQ(i => i + 1);
      setSingleSel("");
      setMultiSel([]);
      setOpenValue("");
    } else {
      localStorage.setItem("scorecard_score", String(newScore));
      localStorage.setItem("scorecard_answers", JSON.stringify(newQualifying));
      router.push("/results");
    }
  }

  // ── Yes / No handler ───────────────────────────────────────────
  function handleYesNo(isYes: boolean) {
    let newScore = score;
    if (q.scored) {
      const isGood = q.yesIsGood ? isYes : !isYes;
      if (isGood) {
        newScore = score + (q.impact === "high" ? HIGH : MED);
        setScore(newScore);
      }
    }
    goNext(newScore, qualifying);
  }

  // ── Multi-select toggle ────────────────────────────────────────
  function toggleMulti(opt: string) {
    setMultiSel(prev =>
      prev.includes(opt) ? prev.filter(o => o !== opt) : [...prev, opt]
    );
  }

  // ── Continue handler (qualifying questions) ────────────────────
  function handleContinue() {
    let val: unknown = singleSel;
    if (q.type === "multi" || q.type === "multi-open") {
      val = { selected: multiSel, ...(openValue ? { other: openValue } : {}) };
    }
    const newQualifying = { ...qualifying, [`q${q.id}`]: val };
    setQualifying(newQualifying);
    goNext(score, newQualifying);
  }

  // ── Can continue? ──────────────────────────────────────────────
  const canContinue =
    q.type === "single" ? singleSel !== "" :
    q.type === "multi" || q.type === "multi-open" ? true : // allow skip
    false;

  // ── Render ─────────────────────────────────────────────────────
  return (
    <main className="relative min-h-screen w-full overflow-hidden flex items-center justify-center p-6">
      {/* Background */}
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

      {/* Card */}
      <div className="relative z-10 w-full max-w-[640px]">
        {/* Progress bar */}
        <div className="h-[3px] w-full bg-white/10 rounded-full mb-6 overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="glass-card rounded-[var(--radius-lg)] overflow-hidden">
          <div key={currentQ} className="p-8 md:p-10 space-y-8 animate-slide-in">

            {/* Question counter + section label */}
            <div className="flex items-center justify-between">
              <span className="font-body text-[11px] font-medium uppercase tracking-[0.18em] text-primary">
                {isQualifyingSection
                  ? `About you — ${currentQ - 9} of 4`
                  : `Question ${currentQ + 1} of 10`}
              </span>
              {isQualifyingSection && currentQ === 10 && (
                <span className="font-body text-[11px] text-muted uppercase tracking-wider">
                  No wrong answers
                </span>
              )}
            </div>

            {/* Question text */}
            <h2 className="font-heading text-[26px] md:text-[30px] text-white leading-tight uppercase">
              {q.text}
            </h2>

            {/* ── Yes / No ── */}
            {q.type === "yesno" && (
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => handleYesNo(true)}
                  className="h-[64px] font-body font-semibold text-[13px] uppercase tracking-[0.12em] text-white/90 glass-card rounded-[var(--radius-md)] border border-transparent transition-all duration-200 hover:bg-primary/10 hover:border-primary hover:text-white active:scale-[0.98]"
                >
                  {q.yesLabel ?? "Yes"}
                </button>
                <button
                  onClick={() => handleYesNo(false)}
                  className="h-[64px] font-body font-semibold text-[13px] uppercase tracking-[0.12em] text-white/90 glass-card rounded-[var(--radius-md)] border border-transparent transition-all duration-200 hover:bg-white/5 hover:border-white/20 hover:text-white active:scale-[0.98]"
                >
                  {q.noLabel ?? "No"}
                </button>
              </div>
            )}

            {/* ── Single select ── */}
            {q.type === "single" && (
              <div className="space-y-3">
                {q.options!.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setSingleSel(opt)}
                    className={`w-full text-left px-5 py-4 font-body text-sm text-white/90 rounded-[var(--radius-md)] border transition-all duration-200 flex items-center justify-between gap-3 ${
                      singleSel === opt
                        ? "bg-primary/10 border-primary text-white"
                        : "glass-card border-transparent hover:bg-white/5 hover:border-white/20"
                    }`}
                  >
                    <span>{opt}</span>
                    {singleSel === opt && (
                      <Check className="w-4 h-4 text-primary shrink-0" />
                    )}
                  </button>
                ))}
              </div>
            )}

            {/* ── Multi select ── */}
            {(q.type === "multi" || q.type === "multi-open") && (
              <div className="space-y-3">
                {q.options!.map((opt) => {
                  const checked = multiSel.includes(opt);
                  return (
                    <button
                      key={opt}
                      onClick={() => toggleMulti(opt)}
                      className={`w-full text-left px-5 py-4 font-body text-sm text-white/90 rounded-[var(--radius-md)] border transition-all duration-200 flex items-center gap-3 ${
                        checked
                          ? "bg-primary/10 border-primary text-white"
                          : "glass-card border-transparent hover:bg-white/5 hover:border-white/20"
                      }`}
                    >
                      <span className={`w-4 h-4 shrink-0 rounded border flex items-center justify-center transition-colors ${checked ? "bg-primary border-primary" : "border-white/30"}`}>
                        {checked && <Check className="w-3 h-3 text-black" strokeWidth={3} />}
                      </span>
                      {opt}
                    </button>
                  );
                })}

                {/* Open field for Q13 */}
                {q.type === "multi-open" && (
                  <div className="pt-1">
                    <label className="font-body text-[11px] uppercase tracking-[0.15em] text-muted mb-2 block">
                      {q.openFieldLabel}
                    </label>
                    <input
                      type="text"
                      value={openValue}
                      onChange={e => setOpenValue(e.target.value)}
                      placeholder="Describe what you tried..."
                      className="w-full h-[48px] px-4 font-body text-sm text-white bg-black/30 border border-glass-border rounded-[var(--radius-md)] focus:outline-none focus:border-primary transition-colors placeholder:text-muted/50"
                    />
                  </div>
                )}
              </div>
            )}

            {/* Continue button for qualifying questions */}
            {q.type !== "yesno" && (
              <button
                onClick={handleContinue}
                disabled={!canContinue}
                className="group w-full h-[56px] flex items-center justify-center gap-2 bg-primary text-black font-body font-bold text-[12px] uppercase tracking-[0.12em] rounded-[var(--radius-md)] transition-all duration-300 hover:brightness-110 hover:-translate-y-[2px] active:scale-[0.98] disabled:opacity-30 disabled:cursor-not-allowed disabled:translate-y-0 disabled:brightness-100 shadow-[0_4px_16px_rgba(212,175,55,0.2)]"
              >
                {currentQ === TOTAL - 1 ? "See My Results" : "Continue"}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            )}

          </div>
        </div>
      </div>
    </main>
  );
}
