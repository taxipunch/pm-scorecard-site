import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export default function Home() {
  return (
    <main className="bg-background text-white">

      {/* ── Hero ── */}
      <section className="relative min-h-screen w-full overflow-hidden flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero.png"
            alt="Property"
            fill
            priority
            quality={95}
            className="object-cover [object-position:center_75%] animate-pan"
          />
          <div className="absolute inset-0 bg-background/30" />
        </div>

        <div className="relative z-10 w-full container mx-auto px-6 lg:px-12 flex items-center justify-start">
          <div className="w-full max-w-[580px] glass-card rounded-[var(--radius-lg)] p-8 md:p-12">
            <div className="flex flex-col items-start text-left animate-fade-in">

              <Image
                src="/images/taxipunch-logo.png"
                alt="TaxiPunch"
                width={130}
                height={40}
                className="object-contain object-left mb-3 -ml-1"
                style={{ maxWidth: 130 }}
              />

              <span className="font-body text-[11px] font-medium uppercase tracking-[0.2em] text-primary mb-6">
                Automation Readiness Scorecard
              </span>

              <h1 className="font-heading text-[26px] md:text-[30px] leading-[1.1] text-white mb-3 uppercase">
                You don&apos;t trust automation.<br />And who can blame you.
              </h1>

              <p className="font-body text-sm text-[#a0aabf] mb-4 leading-relaxed">
                Wouldn&apos;t it be cool if automation was
              </p>

              <div className="mb-6">
                <p className="font-heading text-[42px] md:text-[52px] leading-none text-white uppercase">
                  Zero% trust
                </p>
                <p className="font-heading text-[42px] md:text-[52px] leading-none text-primary uppercase">
                  100% verified.
                </p>
              </div>

              <h2 className="font-heading text-[22px] md:text-[26px] leading-[1.1] text-white mb-4 uppercase">
                You can only be in one place at a time.<br />Until now.
              </h2>

              <p className="font-body text-sm text-[#a0aabf] mb-1 leading-relaxed">
                Automation is doing for this generation what electricity did in the 20th century.
              </p>
              <p className="font-body text-sm text-[#a0aabf] mb-8 leading-relaxed">
                And your competitors are already using it.
              </p>

              <div className="w-full border-t border-glass-border mb-8" />

              <p className="font-body text-[13px] font-medium text-white mb-1 uppercase tracking-wide">
                10 questions. 3 minutes. Operational clarity.
              </p>
              <p className="font-body text-sm text-[#a0aabf] mb-8 leading-relaxed">
                See how much ground your operation covers — when you&apos;re not there.
              </p>

              <Link
                href="/quiz"
                className="group inline-flex items-center justify-center h-[56px] px-8 bg-primary text-black font-body font-bold text-[12px] uppercase tracking-[0.12em] rounded-[var(--radius-md)] transition-all duration-300 hover:brightness-110 hover:-translate-y-[2px] shadow-[0_4px_16px_rgba(212,175,55,0.25)] active:scale-[0.98] gap-2 w-full sm:w-auto"
              >
                Unlock Your Automation Report <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-[2px] group-hover:-translate-y-[2px]" />
              </Link>

            </div>
          </div>
        </div>
      </section>

      {/* ── What this measures ── */}
      <section className="w-full bg-background py-24 px-6 lg:px-12">
        <div className="container mx-auto max-w-5xl">

          <p className="font-body text-[11px] font-medium uppercase tracking-[0.2em] text-primary mb-10">
            What this assessment measures and improves
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            <div className="flex flex-col gap-4 border-t border-glass-border pt-8">
              <span className="font-heading text-[48px] leading-none text-white/10">01</span>
              <h3 className="font-heading text-[22px] text-white uppercase leading-tight">
                Work that confirms itself
              </h3>
              <p className="font-body text-sm text-[#a0aabf] leading-relaxed">
                Without a phone call or a drive-out.
              </p>
            </div>

            <div className="flex flex-col gap-4 border-t border-glass-border pt-8">
              <span className="font-heading text-[48px] leading-none text-white/10">02</span>
              <h3 className="font-heading text-[22px] text-white uppercase leading-tight">
                Problems that surface before they become one
              </h3>
              <p className="font-body text-sm text-[#a0aabf] leading-relaxed">
                You find out because your system caught it — not because someone complained.
              </p>
            </div>

            <div className="flex flex-col gap-4 border-t border-glass-border pt-8">
              <span className="font-heading text-[48px] leading-none text-white/10">03</span>
              <h3 className="font-heading text-[22px] text-white uppercase leading-tight">
                A system that handles 10pm Sunday
              </h3>
              <p className="font-body text-sm text-[#a0aabf] leading-relaxed">
                So you don&apos;t have to.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ── Who built this ── */}
      <section className="w-full bg-background border-t border-glass-border py-24 px-6 lg:px-12">
        <div className="container mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-16 items-start">

          {/* Left: bio */}
          <div>
            <p className="font-body text-[11px] font-medium uppercase tracking-[0.2em] text-primary mb-6">
              Who built this
            </p>
            <p className="font-body text-sm font-semibold text-white mb-6 tracking-wide">
              TaxiPunch · Williamsport, PA
            </p>
            <p className="font-body text-sm text-[#a0aabf] leading-[1.8]">
              I&apos;m Joseph, and I build automation systems for property managers — specifically the ones who&apos;ve already tried the off-the-shelf solutions and found out the hard way that automated reports are no substitute for honest eyeballs-on-site confirmation.
            </p>
            <p className="font-body text-sm text-[#a0aabf] leading-[1.8] mt-4">
              This scorecard is built around the failure points I see most often in operations your size: jobs that close on paper but not in the field, emergencies that reach tenants before they reach you, and workflows that still require a person to make them actually work.
            </p>
          </div>

          {/* Right: second CTA */}
          <div className="glass-card rounded-[var(--radius-lg)] p-8 flex flex-col gap-6">
            <div>
              <h3 className="font-heading text-[26px] text-white uppercase leading-tight mb-3">
                See how much ground your operation actually covers
              </h3>
              <p className="font-body text-sm text-[#a0aabf] leading-relaxed">
                10 questions. Under 3 minutes.<br />
                Immediate results — no waiting, no sales call required.
              </p>
            </div>

            <Link
              href="/quiz"
              className="group inline-flex items-center justify-center h-[52px] px-6 bg-primary text-black font-body font-bold text-[12px] uppercase tracking-[0.12em] rounded-[var(--radius-md)] transition-all duration-300 hover:brightness-110 hover:-translate-y-[2px] shadow-[0_4px_16px_rgba(212,175,55,0.2)] active:scale-[0.98] gap-2 w-full"
            >
              Start the Free Assessment <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-[2px] group-hover:-translate-y-[2px]" />
            </Link>

            <div className="flex flex-wrap gap-3">
              {["Free", "Immediate results", "No account required"].map((tag) => (
                <span key={tag} className="font-body text-[11px] uppercase tracking-[0.1em] text-[#a0aabf] border border-glass-border rounded-full px-3 py-1">
                  {tag}
                </span>
              ))}
            </div>

            <p className="font-body text-[12px] text-[#a0aabf] leading-relaxed border-t border-glass-border pt-5">
              You&apos;ll get a score, a tier, and specific recommendations for your operation.
            </p>
          </div>

        </div>
      </section>

    </main>
  );
}
