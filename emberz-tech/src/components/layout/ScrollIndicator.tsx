import { useRef } from "react";
import { ChevronDown } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export function ScrollIndicator({ activeIndex }: { activeIndex: number }) {
  const indicatorRef = useRef<HTMLDivElement>(null);

  // Subtle floating bounce animation
  useGSAP(() => {
    if (!indicatorRef.current) return;
    gsap.to(".scroll-chevron", {
      y: 4,
      duration: 1.5,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut"
    });
  }, []);

  // Hide the indicator if we are on the final contact screen (screen 9)
  if (activeIndex >= 9) return null;

  return (
    <div 
      ref={indicatorRef}
      className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40 pointer-events-none flex flex-col items-center gap-1 opacity-60"
    >
      <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-zinc-400">
        [ SCROLL / NAVIGATE ]
      </span>
      <ChevronDown className="scroll-chevron w-3.5 h-3.5 text-[#e3c091]" />
    </div>
  );
}