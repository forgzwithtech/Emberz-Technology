import { useRef } from "react";
import { ArrowUpRight, Terminal, Cpu } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export function HeroSection({ activeIndex }: { activeIndex: number }) {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    // If we are on Screen 0, sit at Y: 0%. If we move to Screen 1, drop down to Y: 100%.
    gsap.to(containerRef.current, {
      yPercent: activeIndex === 0 ? 0 : 100,
      opacity: activeIndex === 0 ? 1 : 0,
      duration: 1.2,
      ease: "power3.inOut",
    });
  }, [activeIndex]);

  return (
    <section ref={containerRef} className="absolute inset-0 w-full h-full flex flex-col justify-between px-6 sm:px-12 pt-28 pb-10 overflow-hidden">
      {/* Background Kinetic Typography */}
      <div className="absolute inset-0 flex items-center justify-center -z-10 overflow-hidden pointer-events-none select-none">
        <h1 className="text-[17vw] font-black tracking-tighter text-[#7c8a99]/[0.07] leading-none uppercase font-mono select-none">
          SYSTEMS
        </h1>
      </div>

      <div className="w-full flex justify-between items-center z-10 pointer-events-none">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-[#e3c091] shadow-[0_0_10px_#e3c091] animate-pulse" />
          <span className="text-xs font-mono uppercase tracking-widest text-zinc-400">
            Emberz Technology // Engineering Core
          </span>
        </div>
        <span className="hidden sm:inline-block text-xs font-mono text-zinc-500 uppercase tracking-widest">
          [ SYS.CORE // ACTIVE ]
        </span>
      </div>

      <div className="w-full flex flex-col items-center justify-center my-auto pointer-events-none z-20">
        <div className="h-[38vh] sm:h-[44vh] w-full pointer-events-none" />
        <button onClick={() => window.dispatchEvent(new WheelEvent("wheel", { deltaY: 100 }))} className="group inline-flex items-center gap-3 px-8 py-3 rounded-full bg-zinc-950/90 hover:bg-[#e3c091] text-white hover:text-black border border-[#7c8a99]/20 transition-all duration-300 shadow-2xl backdrop-blur-md pointer-events-auto cursor-pointer">
          <span className="text-xs font-mono font-bold uppercase tracking-wider">Explore Capabilities</span>
          <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </button>
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-end z-10 pointer-events-none">
        <div className="flex flex-wrap items-center gap-2 pointer-events-auto">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/10 bg-white/[0.02] text-xs font-mono text-zinc-300"><Cpu className="w-3.5 h-3.5 text-[#7c8a99]" /> Full-Stack Systems</span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/10 bg-white/[0.02] text-xs font-mono text-zinc-300"><Terminal className="w-3.5 h-3.5 text-[#e3c091]" /> .NET & React Native</span>
        </div>
        <div className="md:max-w-md md:ml-auto pointer-events-auto">
          <h3 className="text-xs font-mono uppercase tracking-widest text-[#e3c091] mb-1.5">Production Engineering</h3>
          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-light">We build high-concurrency cloud infrastructure, offline-first mobile applications, and low-latency digital platforms engineered from the ground up.</p>
        </div>
      </div>
    </section>
  );
}