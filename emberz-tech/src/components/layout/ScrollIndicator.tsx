import { useRef } from "react";
import { ChevronDown } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export function ScrollIndicator({ activeIndex }: { activeIndex: number }) {
  const indicatorRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!indicatorRef.current) return;
    gsap.to(".scroll-chevron", {
      y: 4,
      duration: 1.2,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut"
    });
  }, []);

  // Hide on contact section
  if (activeIndex >= 9) return null;

  return (
    <div 
      ref={indicatorRef}
      className="fixed bottom-3 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-none flex flex-col items-center gap-1 opacity-80 pb-[env(safe-area-inset-bottom)]"
    >
      <span className="text-[8px] sm:text-[9px] font-mono uppercase tracking-[0.25em] text-zinc-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
        <span className="inline sm:hidden">[ SWIPE UP ]</span>
        <span className="hidden sm:inline">[ SCROLL / NAVIGATE ]</span>
      </span>
      <ChevronDown className="scroll-chevron w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#e3c091] drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]" />
    </div>
  );
}