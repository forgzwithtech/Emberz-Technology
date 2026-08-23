import { useRef, useEffect, useState } from "react";
import { Mail, MapPin, ArrowRight } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export function ContactSection({ activeIndex }: { activeIndex: number }) {
  const containerRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState({
    name: "", company: "", email: "", service: "Web Development", details: ""
  });

  const { contextSafe } = useGSAP(() => {
    if (!containerRef.current) return;
    gsap.set(containerRef.current, { yPercent: -100, opacity: 0 });
    gsap.set(".contact-reveal", { y: 40, opacity: 0 });
  }, { scope: containerRef });

  useEffect(() => {
    const animateScreen = contextSafe(() => {
      if (activeIndex === 9) {
        gsap.to(containerRef.current, { yPercent: 0, opacity: 1, duration: 1.0, ease: "expo.inOut" });
        gsap.to(".contact-reveal", { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out", delay: 0.4 });
      } else {
        gsap.to(containerRef.current, { yPercent: -100, opacity: 0, duration: 1.0, ease: "expo.inOut" });
        gsap.to(".contact-reveal", { y: 40, opacity: 0, duration: 0.4 });
      }
    });
    animateScreen();
  }, [activeIndex]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`New Project Inquiry: ${formData.company || formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nCompany: ${formData.company}\nEmail: ${formData.email}\nService: ${formData.service}\n\nProject Details:\n${formData.details}`
    );
    window.location.href = `mailto:emberztech@gmail.com?subject=${subject}&body=${body}`;
  };

  // Tightened padding in inputs to save vertical space
  const inputClass = "w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#e3c091] focus:bg-black/60 transition-colors";

  return (
    // Reduced pt-24 to pt-16 so it starts higher up on the screen
    <section ref={containerRef} className="absolute inset-0 w-full h-full flex flex-col justify-center pt-16 pb-6 px-5 sm:px-12 bg-transparent overflow-hidden z-40 pointer-events-none">
      
      <div className="absolute inset-0 -z-10 flex justify-center items-center opacity-30">
        <div className="absolute w-[1px] h-full bg-gradient-to-b from-transparent via-white/10 to-transparent" />
        <div className="absolute h-[1px] w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center pointer-events-auto h-full">
        
        {/* LEFT COLUMN: The Form */}
        <div className="flex flex-col justify-center h-full max-w-lg mt-8 md:mt-0">
          <div className="contact-reveal flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-[#e3c091] animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-widest text-[#e3c091]">Start a Project</span>
          </div>

          <h2 className="contact-reveal text-4xl sm:text-5xl font-bold text-white tracking-tight mb-2">
            Let's build <br />
            <span className="text-zinc-500">something.</span>
          </h2>
          
          <p className="contact-reveal text-sm text-zinc-400 mb-6 font-light">
            Tell us about your project, and we'll get back to you with a quote and a technical strategy.
          </p>

          <form onSubmit={handleSubmit} className="contact-reveal flex flex-col gap-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input required type="text" placeholder="Your Name" className={inputClass} value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
              <input type="text" placeholder="Company (Optional)" className={inputClass} value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} />
            </div>
            
            <input required type="email" placeholder="Email Address" className={inputClass} value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
            
            <select className={`${inputClass} appearance-none cursor-pointer`} value={formData.service} onChange={e => setFormData({...formData, service: e.target.value})}>
              <option value="Web Development">Web Development</option>
              <option value="Mobile App (React Native)">Mobile App (React Native)</option>
              <option value="Enterprise Backend / API">Enterprise Backend / API</option>
              <option value="Full Architecture Suite">Full Architecture Suite</option>
            </select>

            {/* Reduced to 2 rows to save space */}
            <textarea required placeholder="Briefly describe your project..." rows={2} className={`${inputClass} resize-none`} value={formData.details} onChange={e => setFormData({...formData, details: e.target.value})} />

            <button type="submit" className="group flex items-center justify-center gap-3 w-full bg-white text-black font-bold font-mono uppercase tracking-widest py-3 rounded-lg hover:bg-[#e3c091] transition-colors mt-1">
              Get a Quote
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-2" />
            </button>
          </form>

          {/* Direct Comms - reduced margin top */}
          <div className="contact-reveal flex items-center gap-6 mt-5 pt-4 border-t border-white/10">
            <div className="flex items-center gap-2 text-zinc-400">
              <Mail className="w-4 h-4 text-white" />
              <a href="mailto:emberztech@gmail.com" className="text-xs font-mono hover:text-[#e3c091] transition-colors">emberztech@gmail.com</a>
            </div>
            <div className="flex items-center gap-2 text-zinc-400">
              <MapPin className="w-4 h-4 text-white" />
              <span className="text-xs font-mono">Akure, Nigeria</span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Empty space for Logo */}
        <div className="hidden md:block w-full h-full pointer-events-none"></div>

      </div>
    </section>
  );
}