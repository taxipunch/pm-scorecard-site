import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image 
          src="/images/hero.png" 
          alt="Modern Architecture" 
          fill
          priority
          className="object-cover animate-pan"
        />
        <div className="absolute inset-0 bg-background/20" />
      </div>

      <div className="relative z-10 w-full min-h-screen container mx-auto px-6 lg:px-12 flex items-center justify-start">
        <div className="w-full max-w-[550px] glass-card rounded-[var(--radius-lg)] p-8 md:p-12 overflow-hidden">
          <div className="flex flex-col items-start text-left animate-fade-in">
            
            <h1 className="font-heading text-[32px] md:text-[38px] leading-[1.05] font-normal text-white mb-8 uppercase">
              Automation is doing for this generation what electricity did for the 20th Century.
            </h1>
            
            <h2 className="font-heading text-[32px] md:text-[38px] leading-[1.1] font-normal text-primary mb-8 uppercase">
              And your competitors are already using it...
            </h2>
            
            <p className="font-body text-sm md:text-[15px] text-[#a0aabf] mb-6 leading-relaxed">
              The question isn&apos;t whether AI will change property management. It already is. This assessment tells you where you stand — and what it&apos;s costing you to wait.
            </p>

            <p className="font-body text-[13px] md:text-sm text-[#a0aabf] mb-10 leading-relaxed">
              Find out how automated your operation really is — and what your competitors are doing that you&apos;re not. Free. 3 minutes. Immediate results.
            </p>

            <Link 
              href="/quiz"
              className="group inline-flex items-center justify-center h-[56px] px-8 bg-primary text-white font-body font-semibold text-[13px] uppercase tracking-[0.1em] rounded-[var(--radius-md)] transition-all duration-300 hover:brightness-110 hover:-translate-y-[2px] shadow-[0_4px_16px_rgba(223,184,65,0.2)] active:scale-[0.98] gap-2 w-full sm:w-auto"
            >
              Answer 15 Questions <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>

          </div>
        </div>
      </div>
    </main>
  );
}
