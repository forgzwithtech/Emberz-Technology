import { useEffect, useState, useRef } from "react";
import { Terminal, ArrowUpRight, Menu, X } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface NavbarProps {
  activeIndex: number;
  onNavigate: (index: number) => void;
}

const NAV_ITEMS = [
  { label: "Work", targetIndex: 5 },       // LabsSection
  { label: "Capabilities", targetIndex: 1 },// ServicesSection
  { label: "Contact", targetIndex: 9 },     // ContactSection
];

export function Navbar({ activeIndex, onNavigate }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Cinematic entrance on mount
  useGSAP(() => {
    if (!navRef.current) return;
    gsap.fromTo(
      navRef.current,
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power3.out", delay: 0.2 }
    );
  }, []);

  // Handle open and reverse close animations using GSAP timelines
  useEffect(() => {
    if (menuOpen) {
      // OPEN ANIMATION
      gsap.fromTo(
        menuRef.current,
        { opacity: 0, y: -15, pointerEvents: "none" },
        { opacity: 1, y: 0, pointerEvents: "auto", duration: 0.35, ease: "power2.out" }
      );
      gsap.fromTo(
        ".mobile-menu-item",
        { x: -20, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.4, stagger: 0.06, ease: "power3.out", delay: 0.1 }
      );
    }
  }, [menuOpen]);

  const handleToggle = () => {
    if (menuOpen) {
      // REVERSE CLOSE ANIMATION
      gsap.to(".mobile-menu-item", {
        x: -15,
        opacity: 0,
        duration: 0.2,
        stagger: 0.03,
        ease: "power2.in",
      });
      gsap.to(menuRef.current, {
        opacity: 0,
        y: -15,
        duration: 0.3,
        ease: "power2.in",
        delay: 0.1,
        onComplete: () => setMenuOpen(false),
      });
    } else {
      setMenuOpen(true);
    }
  };

  const handleNavClick = (index: number) => {
    if (menuOpen) {
      gsap.to(".mobile-menu-item", {
        x: -15,
        opacity: 0,
        duration: 0.2,
        stagger: 0.03,
        ease: "power2.in",
      });
      gsap.to(menuRef.current, {
        opacity: 0,
        y: -15,
        duration: 0.3,
        ease: "power2.in",
        delay: 0.1,
        onComplete: () => setMenuOpen(false),
      });
    }
    onNavigate(index);
  };

  return (
    <header
      ref={navRef}
      className="fixed top-0 left-0 w-full z-50 py-5 sm:py-6 px-6 sm:px-12 bg-gradient-to-b from-[#070709]/80 to-transparent backdrop-blur-sm pointer-events-auto"
    >
      <nav className="flex items-center justify-between max-w-7xl mx-auto">
        
        {/* Studio Branding */}
        <button 
          onClick={() => handleNavClick(0)}
          className="flex items-center gap-2.5 text-left group cursor-pointer"
        >
          <div className="w-7 h-7 rounded-lg bg-black/60 border border-white/10 flex items-center justify-center text-[#e3c091] group-hover:border-[#e3c091]/50 transition-colors">
            <Terminal className="w-3.5 h-3.5" />
          </div>
          <div>
            <span className="block text-xs font-mono font-bold text-white tracking-widest uppercase">
              Emberz <span className="text-[#e3c091]">Tech</span>
            </span>
            <span className="block text-[9px] font-mono text-zinc-500 tracking-tighter">
              [SYS_ACTIVE]
            </span>
          </div>
        </button>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-8 bg-black/40 border border-white/5 px-6 py-2 rounded-full backdrop-blur-md">
          {NAV_ITEMS.map((item) => {
            const isActive = activeIndex >= item.targetIndex && activeIndex < item.targetIndex + 4;
            return (
              <li key={item.label}>
                <button
                  onClick={() => handleNavClick(item.targetIndex)}
                  className={`text-xs font-mono uppercase tracking-widest transition-colors cursor-pointer ${
                    isActive ? "text-[#e3c091] font-bold" : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {item.label}
                </button>
              </li>
            );
          })}
        </ul>

        {/* Start a Project Button */}
        <button
          onClick={() => handleNavClick(9)}
          className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 text-xs font-mono uppercase tracking-widest text-white bg-white/[0.02] hover:bg-[#e3c091] hover:text-black hover:border-[#e3c091] transition-all duration-300 cursor-pointer group"
        >
          <span>Start a Project</span>
          <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </button>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-white p-2 rounded-lg bg-white/5 border border-white/10 cursor-pointer"
          onClick={handleToggle}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile Dropdown Menu (Always rendered when state is true, allowing exit tweens) */}
      {menuOpen && (
        <div 
          ref={menuRef}
          className="md:hidden absolute top-full left-0 w-full bg-[#070709]/95 backdrop-blur-xl border-b border-white/10 px-6 py-6 flex flex-col gap-4 shadow-2xl opacity-0"
        >
          {NAV_ITEMS.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNavClick(link.targetIndex)}
              className="mobile-menu-item text-left text-sm font-mono uppercase tracking-widest text-zinc-300 hover:text-[#e3c091] py-2 border-b border-white/5 cursor-pointer opacity-0"
            >
              // {link.label}
            </button>
          ))}
          <button
            onClick={() => handleNavClick(9)}
            className="mobile-menu-item mt-2 flex items-center justify-between w-full px-5 py-3 rounded-xl bg-white text-black text-xs font-mono uppercase tracking-widest font-bold cursor-pointer opacity-0"
          >
            <span>Start a Project</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </header>
  );
}