import { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Observer } from "gsap/Observer";

import { Scene } from "../components/canvas/Scene";
import { Navbar } from "../components/layout/Navbar";
import { ScrollIndicator } from "../components/layout/ScrollIndicator"; // <-- NEW IMPORT
import { HeroSection } from "../components/home/HeroSection";
import { ServicesSection } from "../components/home/ServicesSection";
import { LabsSection } from "../components/home/LabsSection";
import { ContactSection } from "../components/home/ContactSection";

gsap.registerPlugin(Observer);

export function Home() {
  const [activeIndex, setActiveIndex] = useState(0);
  const indexRef = useRef(0);
  const isAnimating = useRef(false);

  const totalScreens = 10; 

  const changeScreen = (newIndex: number) => {
    isAnimating.current = true;
    indexRef.current = newIndex;
    setActiveIndex(newIndex);
    setTimeout(() => { isAnimating.current = false; }, 500);
  };

  useGSAP(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isAnimating.current) return;
      if (e.key === "ArrowDown" || e.key === "PageDown" || e.key === " ") {
        if (indexRef.current < totalScreens - 1) changeScreen(indexRef.current + 1);
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        if (indexRef.current > 0) changeScreen(indexRef.current - 1);
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    const obs = Observer.create({
      target: window,
      type: "wheel,touch,pointer",
      tolerance: 20, 
      preventDefault: true,
      onDown: () => {
        if (!isAnimating.current && indexRef.current < totalScreens - 1) changeScreen(indexRef.current + 1);
      },
      onUp: () => {
        if (!isAnimating.current && indexRef.current > 0) changeScreen(indexRef.current - 1);
      },
    });

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      obs.kill();
    };
  }, []);

  return (
    <div className="fixed inset-0 w-full h-screen overflow-hidden bg-[#070709] text-white selection:bg-[#e3c091] selection:text-black">
      <Scene activeIndex={activeIndex} />
      <Navbar activeIndex={activeIndex} onNavigate={changeScreen} />
      
      <main className="relative w-full h-full z-10">
        <HeroSection activeIndex={activeIndex} />
        <ServicesSection activeIndex={activeIndex} />
        <LabsSection activeIndex={activeIndex} />
        <ContactSection activeIndex={activeIndex} />
      </main>

      {/* Persistent HUD Scroll Cue */}
      <ScrollIndicator activeIndex={activeIndex} />
    </div>
  );
}