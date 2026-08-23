import { useRef, useEffect } from "react";
import { Terminal, Database, Building2, Code2 } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

// 1. IMPORT YOUR IMAGES HERE so Vite correctly bundles them
import streetpayImg from "../../assets/streetpay.png";
import portfolioImg from "../../assets/portfolio.png";
import reyitaImg from "../../assets/reyita.png";

export function LabsSection({ activeIndex }: { activeIndex: number }) {
  const containerRef = useRef<HTMLElement>(null);
  const cardRotations = [1, -2, 2];

  const { contextSafe } = useGSAP(() => {
    if (!containerRef.current) return;
    const isMobile = window.innerWidth < 768;

    gsap.set(containerRef.current, { yPercent: -100, opacity: 0 }); 
    gsap.set(".labs-reveal", { y: isMobile ? -20 : 30, opacity: 0 });
    
    [0, 1, 2].forEach(i => {
      gsap.set(`#lab-card-${i}`, { 
        y: isMobile ? -400 : 150, opacity: 0, rotateX: isMobile ? 35 : -25, rotateZ: 0, scale: isMobile ? 0.9 : 0.95 
      });
    });
  }, { scope: containerRef });

  useEffect(() => {
    const animateScreen = contextSafe(() => {
      const isMobile = window.innerWidth < 768;

      if (activeIndex >= 5 && activeIndex < 9) {
        gsap.to(containerRef.current, { yPercent: 0, opacity: 1, duration: 1.0, ease: "expo.inOut" });
        gsap.to(".labs-reveal", { y: 0, opacity: 1, duration: 0.7, stagger: 0.08, ease: "power3.out", delay: 0.2 });
      } else if (activeIndex >= 9) {
        // EXIT DOWN: Sinks down to make room for Contact Section
        gsap.to(containerRef.current, { yPercent: 100, opacity: 0, duration: 1.0, ease: "expo.inOut" });
      } else {
        // EXIT UP: Hides back above when scrolling up to Services
        gsap.to(containerRef.current, { yPercent: -100, opacity: 0, duration: 1.0, ease: "expo.inOut" });
        gsap.to(".labs-reveal", { y: isMobile ? -20 : 30, opacity: 0, duration: 0.4 });
      }

      const mobileRotations = [2, -2, 1];

      if (activeIndex >= 4 && activeIndex < 9) {
        [0, 1, 2].forEach((cardIndex) => {
          const targetIndex = cardIndex + 6; 
          
          if (activeIndex >= targetIndex) {
            gsap.to(`#lab-card-${cardIndex}`, { 
              y: 0, opacity: 1, rotateX: 0, rotateZ: isMobile ? mobileRotations[cardIndex] : cardRotations[cardIndex],
              scale: 1, duration: isMobile ? 0.75 : 0.9, ease: isMobile ? "bounce.out" : "back.out(1.2)" 
            });
          } else {
            gsap.to(`#lab-card-${cardIndex}`, { 
              y: isMobile ? -400 : 150, opacity: 0, rotateX: isMobile ? 35 : -25, rotateZ: 0, 
              scale: isMobile ? 0.9 : 0.95, duration: 0.4, ease: "power2.in" 
            });
          }
        });
      }
    });

    animateScreen();
  }, [activeIndex]);

  const projects = [
    {
      id: "STREETPAY",
      title: "P2P Financial Mesh",
      icon: <Terminal className="w-4 h-4 sm:w-5 sm:h-5" />,
      color: "#00f0ff",
      image: streetpayImg, // Passed as an imported variable, not a string
      description: "Proprietary offline-first payment architecture. Engineered using Bluetooth & QR protocols to process peer-to-peer transactions without external internet.",
      tags: ["React Native", "Bluetooth", "QR"]
    },
    {
      id: "PORTFOLIO",
      title: "Professional Portfolios",
      icon: <Database className="w-4 h-4 sm:w-5 sm:h-5" />,
      color: "#e3c091",
      image: portfolioImg, // Passed as an imported variable
      description: "Bespoke, highly-scalable digital portfolios engineered for industry professionals. Built on optimized PHP architecture for complete customizability.",
      tags: ["PHP"]
    },
    {
      id: "REYITA_TK",
      title: "PropTech Ecosystem",
      icon: <Building2 className="w-4 h-4 sm:w-5 sm:h-5" />,
      color: "#7c8a99",
      image: reyitaImg, // Passed as an imported variable
      description: "Real estate technology platform connecting buyers, renters, and agents. Engineered for seamless discovery and cross-platform data management.",
      tags: ["React", ".NET", "Supabase"]
    }
  ];

  return (
    <section ref={containerRef} className="absolute inset-0 w-full h-full flex flex-col justify-between pt-32 sm:pt-24 pb-6 sm:pb-10 px-5 sm:px-12 bg-transparent overflow-hidden z-30">
      
      <div className="absolute inset-0 -z-10 pointer-events-none flex justify-center items-center">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,#000_60%,transparent_100%)]" />
        <h2 className="text-[16vw] font-black tracking-tighter text-[#e3c091]/[0.02] leading-none uppercase font-mono select-none">
          INTERNAL R&D
        </h2>
      </div>

      <div className="w-full max-w-7xl mx-auto flex flex-col h-full justify-between">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-2 sm:gap-6 pt-4 sm:pt-2">
          <div className="perspective-1000">
            <div className="labs-reveal flex items-center gap-2 mb-1.5 sm:mb-3">
              <span className="w-1.5 h-1.5 rounded-sm bg-[#00f0ff] animate-pulse" />
              <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-[#00f0ff]">
                [ 03 // PROPRIETARY IP ]
              </span>
            </div>
            <h2 className="labs-reveal text-2xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
              Emberz <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-400 to-zinc-600">Labs.</span>
            </h2>
          </div>
          <div className="labs-reveal hidden md:flex items-center gap-4 text-xs font-mono text-zinc-500 pb-1">
            <Code2 className="w-4 h-4 text-[#00f0ff]" />
            <span>RESEARCH_AND_DEVELOPMENT</span>
          </div>
        </div>

        <div className="relative w-full h-[380px] sm:h-[460px] md:h-auto md:grid md:grid-cols-3 md:gap-8 perspective-1000 my-auto">
          {projects.map((project, index) => (
            <div 
              key={project.id} id={`lab-card-${index}`} style={{ zIndex: 10 + index }}
              className="group absolute md:relative inset-0 md:inset-auto p-4 sm:p-5 lg:p-6 rounded-xl bg-[#050608]/95 md:bg-[#07090c]/90 backdrop-blur-2xl border border-white/10 hover:border-white/30 transition-colors duration-300 flex flex-col justify-between shadow-2xl overflow-hidden"
            >
              <div className="w-full h-32 sm:h-36 md:h-40 rounded-lg overflow-hidden relative mb-4 border border-white/5 bg-zinc-900/50">
                <div className="absolute inset-0 bg-gradient-to-t from-[#050608] via-transparent to-transparent z-10" />
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                />
              </div>

              <div className="flex justify-between items-start z-10">
                <div className="p-2 sm:p-2.5 bg-black/40 border border-white/5 shadow-lg rounded-md" style={{ color: project.color }}>
                  {project.icon}
                </div>
                <span className="text-[9px] sm:text-[10px] font-mono font-medium text-zinc-500 tracking-wider">
                  PRJ_{project.id}
                </span>
              </div>

              <div className="z-10 my-3">
                <h3 className="text-sm sm:text-base lg:text-lg font-bold text-white mb-1 font-mono uppercase tracking-tight">
                  {project.title}
                </h3>
                <p className="text-[11px] sm:text-[11px] lg:text-xs text-zinc-400 leading-relaxed font-light">
                  {project.description}
                </p>
              </div>

              <div className="z-10 flex flex-wrap gap-1.5 pt-2 border-t border-white/5 border-dashed">
                {project.tags.map(tag => (
                  <span key={tag} className="px-2 py-0.5 text-[9px] font-mono text-zinc-400 bg-black/50 border border-white/5 rounded-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex md:hidden justify-center items-center gap-2 pt-2">
          {[6, 7, 8].map((step) => (
            <span key={step} className={`h-1 transition-all duration-300 rounded-full ${activeIndex >= step ? "w-6 bg-[#00f0ff]" : "w-2 bg-white/10"}`} />
          ))}
        </div>
      </div>
    </section>
  );
}