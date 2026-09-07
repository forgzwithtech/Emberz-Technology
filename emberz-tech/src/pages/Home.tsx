import { useState, useRef, useCallback } from "react";
import { useProgress } from "@react-three/drei";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Observer } from "gsap/Observer";

import { Scene } from "../components/canvas/Scene";
import { Navbar } from "../components/layout/Navbar";
import { Preloader } from "../components/layout/Preloader";
import { ScrollIndicator } from "../components/layout/ScrollIndicator";
import { HeroSection } from "../components/home/HeroSection";
import { ServicesSection } from "../components/home/ServicesSection";
import { LabsSection } from "../components/home/LabsSection";
import { ContactSection } from "../components/home/ContactSection";

gsap.registerPlugin(Observer);

export function Home() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [sceneReady, setSceneReady] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const { progress } = useProgress();
  const indexRef = useRef(0);
  const isAnimating = useRef(false);

  const totalScreens = 10;

  const handleSceneLoaded = useCallback(() => {
    setSceneReady(true);
  }, []);

  const handlePreloaderComplete = useCallback(() => {
    setShowContent(true);
  }, []);

  const changeScreen = (newIndex: number) => {
    isAnimating.current = true;
    indexRef.current = newIndex;
    setActiveIndex(newIndex);
    setTimeout(() => { isAnimating.current = false; }, 750);
  };

  useGSAP(() => {
    if (!showContent) return;

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
      onChange: (self) => {
        if (isAnimating.current) return;
        const isWheel = self.event && self.event.type.includes("wheel");
        const isForward = isWheel ? self.deltaY > 0 : self.deltaY < 0;

        if (isForward) {
          if (indexRef.current < totalScreens - 1) changeScreen(indexRef.current + 1);
        } else {
          if (indexRef.current > 0) changeScreen(indexRef.current - 1);
        }
      },
    });

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      obs.kill();
    };
  }, [showContent]);

  return (
    <div className="fixed inset-0 w-full h-screen overflow-hidden bg-[#070709] text-white selection:bg-[#e3c091] selection:text-black">
      {/* Preloader blocks the UI until the 3D scene compiles */}
      {!showContent && (
        <Preloader
          progress={progress}
          isReady={sceneReady}
          onComplete={handlePreloaderComplete}
        />
      )}

      {/* 3D Scene starts rendering in the background immediately */}
      <Scene activeIndex={activeIndex} onLoaded={handleSceneLoaded} />

      {/* Main Interactive Interface mounts smoothly upon load completion */}
      {showContent && (
        <>
          <Navbar activeIndex={activeIndex} onNavigate={changeScreen} />
          <main className="relative w-full h-full z-10">
            <HeroSection activeIndex={activeIndex} />
            <ServicesSection activeIndex={activeIndex} />
            <LabsSection activeIndex={activeIndex} />
            <ContactSection activeIndex={activeIndex} />
          </main>
          <ScrollIndicator activeIndex={activeIndex} />
        </>
      )}
    </div>
  );
}