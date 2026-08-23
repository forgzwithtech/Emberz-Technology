import { useRef, useEffect } from "react";
import { Smartphone, Server, Cpu, Code2, WifiOff } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export function ServicesSection({ activeIndex }: { activeIndex: number }) {
  const containerRef = useRef<HTMLElement>(null);
  const cardRotations = [-2, 3, -1];

  const { contextSafe } = useGSAP(() => {
    if (!containerRef.current) return;
    const isMobile = window.innerWidth < 768;

    gsap.set(containerRef.current, { yPercent: -100, opacity: 0 });
    gsap.set(".reveal-text", { y: isMobile ? -20 : 30, opacity: 0 });
    
    [0, 1, 2].forEach(i => {
      gsap.set(`#card-${i}`, { 
        y: isMobile ? -400 : 150, opacity: 0, rotateX: isMobile ? 35 : -25, rotateZ: 0, scale: isMobile ? 0.9 : 0.95 
      });
    });
  }, { scope: containerRef });

  useEffect(() => {
    const animateScreen = contextSafe(() => {
      const isMobile = window.innerWidth < 768;

      // PARALLAX TRANSITION LOGIC
      if (activeIndex >= 1 && activeIndex < 5) {
        // 1. ACTIVE STATE: Screen is in focus
        gsap.to(containerRef.current, { yPercent: 0, opacity: 1, duration: 1.0, ease: "expo.inOut" });
        gsap.to(".reveal-text", { y: 0, opacity: 1, duration: 0.7, stagger: 0.08, ease: "power3.out" });
      } else if (activeIndex >= 5) {
        // 2. EXIT DOWN: Pushed out of the way when scrolling down to Labs
        gsap.to(containerRef.current, { yPercent: 100, opacity: 0, duration: 1.0, ease: "expo.inOut" });
      } else {
        // 3. EXIT UP: Pushed out of the way when scrolling up to Hero
        gsap.to(containerRef.current, { yPercent: -100, opacity: 0, duration: 1.0, ease: "expo.inOut" });
        gsap.to(".reveal-text", { y: isMobile ? -20 : 30, opacity: 0, duration: 0.4 });
      }

      // Step Reveals (Only process if we are actively in this section's range)
      if (activeIndex >= 0 && activeIndex <= 5) {
        [0, 1, 2].forEach((cardIndex) => {
          const targetIndex = cardIndex + 2; 
          
          if (activeIndex >= targetIndex && activeIndex < 5) {
            gsap.to(`#card-${cardIndex}`, { 
              y: 0, opacity: 1, rotateX: 0, rotateZ: cardRotations[cardIndex],
              scale: 1, duration: isMobile ? 0.75 : 0.9, ease: isMobile ? "bounce.out" : "back.out(1.2)" 
            });
          } else {
            gsap.to(`#card-${cardIndex}`, { 
              y: isMobile ? -400 : 150, opacity: 0, rotateX: isMobile ? 35 : -25, rotateZ: 0,
              scale: isMobile ? 0.9 : 0.95, duration: 0.4, ease: "power2.in" 
            });
          }
        });
      }
    });

    animateScreen();
  }, [activeIndex]);

  const services = [
    {
      id: "01",
      title: "Breaking Internet Dependency",
      icon: <WifiOff className="w-4 h-4 sm:w-5 sm:h-5" />,
      color: "#e3c091",
      description: "We engineer resilient offline-first React Native ecosystems. By integrating local mesh networks, Bluetooth, and QR state transfers, we guarantee your critical operations execute flawlessly when the grid goes dark.",
      tags: ["React Native", "P2P Sync", "SQLite"]
    },
    {
      id: "02",
      title: "High-Concurrency Systems",
      icon: <Server className="w-4 h-4 sm:w-5 sm:h-5" />,
      color: "#7c8a99",
      description: "Architecting ironclad .NET Web APIs and scalable microservices. We build robust backend infrastructure featuring real-time SignalR data synchronization, wrapped in streamlined Docker deployments.",
      tags: [".NET C#", "SignalR", "Docker"]
    },
    {
      id: "03",
      title: "Cinematic Web Engineering",
      icon: <Cpu className="w-4 h-4 sm:w-5 sm:h-5" />,
      color: "#00f0ff",
      description: "Building sophisticated web platforms using modern React and TypeScript. We prioritize zero-bloat, state-driven UIs and seamless 3D WebGL integration for highly immersive digital experiences.",
      tags: ["React/TS", "Three.js", "Tailwind"]
    }
  ];

  return (
    <section ref={containerRef} className="absolute inset-0 w-full h-full flex flex-col justify-between pt-32 sm:pt-24 pb-6 sm:pb-10 px-5 sm:px-12 bg-transparent overflow-hidden z-20">
      
      <div className="absolute inset-0 -z-10 pointer-events-none flex justify-center items-center">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]" />
        <h2 className="text-[16vw] font-black tracking-tighter text-[#7c8a99]/[0.03] leading-none uppercase font-mono select-none">
          CAPABILITIES
        </h2>
      </div>

      <div className="w-full max-w-7xl mx-auto flex flex-col h-full justify-between">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-2 sm:gap-6 pt-4 sm:pt-2">
          <div className="perspective-1000">
            <div className="reveal-text flex items-center gap-2 mb-1.5 sm:mb-3">
              <span className="w-1.5 h-1.5 rounded-sm bg-[#e3c091] animate-pulse" />
              <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-[#e3c091]">
                [ 02 // ARCHITECTURE OVERVIEW ]
              </span>
            </div>
            <h2 className="reveal-text text-2xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
              Engineered for <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7c8a99] to-zinc-500">
                Resilience.
              </span>
            </h2>
          </div>
          
          <div className="reveal-text hidden md:flex items-center gap-4 text-xs font-mono text-zinc-500 pb-1">
            <Code2 className="w-4 h-4 text-[#e3c091]" />
            <span>PRODUCTION_READY</span>
          </div>
        </div>

        <div className="relative w-full h-[360px] sm:h-[400px] md:h-auto md:grid md:grid-cols-3 md:gap-8 perspective-1000 my-auto">
          {services.map((service, index) => (
            <div 
              key={service.id} id={`card-${index}`} style={{ zIndex: 10 + index }}
              className="service-card group absolute md:relative inset-0 md:inset-auto p-5 sm:p-6 lg:p-7 rounded-2xl bg-[#0b0d13]/95 md:bg-[#090b0f]/80 backdrop-blur-2xl border border-white/10 hover:border-white/30 transition-colors duration-300 flex flex-col justify-between shadow-2xl overflow-hidden"
            >
              <div 
                className="absolute -inset-px opacity-15 md:opacity-0 md:group-hover:opacity-20 transition-opacity duration-500 rounded-2xl pointer-events-none"
                style={{ background: `radial-gradient(circle at 50% 0%, ${service.color}, transparent 75%)` }}
              />

              <div className="flex justify-between items-start z-10">
                <div className="p-2.5 sm:p-3 rounded-xl bg-black/60 border border-white/10 shadow-lg" style={{ color: service.color }}>
                  {service.icon}
                </div>
                <span className="text-[10px] sm:text-xs font-mono font-medium text-zinc-500 tracking-wider">
                  // SYS.{service.id}
                </span>
              </div>

              <div className="z-10 my-2">
                <h3 className="text-base sm:text-lg lg:text-xl font-bold text-white mb-1.5 sm:mb-2 font-mono uppercase tracking-tight">
                  {service.title}
                </h3>
                <p className="text-xs sm:text-xs lg:text-sm text-zinc-400 leading-relaxed font-light">
                  {service.description}
                </p>
              </div>

              <div className="z-10 flex flex-wrap gap-1.5 sm:gap-2 pt-3 border-t border-white/5">
                {service.tags.map(tag => (
                  <span key={tag} className="px-2.5 py-0.5 text-[9px] sm:text-[10px] font-mono text-zinc-300 bg-white/[0.04] border border-white/10 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex md:hidden justify-center items-center gap-2 pt-2">
          {[2, 3, 4].map((step) => (
            <span key={step} className={`h-1 transition-all duration-300 rounded-full ${activeIndex >= step ? "w-6 bg-[#e3c091]" : "w-2 bg-white/10"}`} />
          ))}
        </div>
      </div>
    </section>
  );
}