import { useEffect, useRef } from "react";
import { Terminal } from "lucide-react";
import gsap from "gsap";

interface PreloaderProps {
  progress: number;
  isReady: boolean;
  onComplete: () => void;
}

export function Preloader({ progress, isReady, onComplete }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (barRef.current) {
      gsap.to(barRef.current, {
        width: `${Math.max(progress, 15)}%`,
        duration: 0.25,
        ease: "power1.out",
      });
    }

    if (isReady && progress >= 100) {
      const tl = gsap.timeline({
        onComplete: onComplete,
      });

      tl.to(".preloader-item", {
        y: -15,
        opacity: 0,
        duration: 0.35,
        stagger: 0.05,
        ease: "power2.in",
      })
      .to(containerRef.current, {
        opacity: 0,
        duration: 0.5,
        ease: "power2.inOut",
      });
    }
  }, [progress, isReady, onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#070709] text-white select-none pointer-events-auto"
    >
      <div className="flex flex-col items-center gap-6 max-w-xs w-full px-6">
        {/* Brand Icon */}
        <div className="preloader-item w-10 h-10 rounded-xl bg-black/80 border border-white/10 flex items-center justify-center text-[#e3c091] shadow-2xl">
          <Terminal className="w-5 h-5 animate-pulse" />
        </div>

        {/* Status Text */}
        <div className="preloader-item text-center">
          <span className="block text-xs font-mono font-bold tracking-[0.25em] uppercase text-zinc-200">
            Emberz <span className="text-[#e3c091]">Technology</span>
          </span>
          <span className="block text-[10px] font-mono text-zinc-500 tracking-wider mt-1">
            INITIALIZING CORE MESH // {Math.round(progress)}%
          </span>
        </div>

        {/* Progress Bar Container */}
        <div className="preloader-item w-full h-[2px] bg-white/5 rounded-full overflow-hidden border border-white/5">
          <div
            ref={barRef}
            className="h-full bg-gradient-to-r from-[#7c8a99] to-[#e3c091] rounded-full transition-all duration-150"
            style={{ width: "15%" }}
          />
        </div>
      </div>
    </div>
  );
}