import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Lenis from "lenis";
import { Home } from "./pages/Home";
// import { CaseStudy } from "./pages/CaseStudy";

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <Router>
      {/* This is the single source of truth for page background color —
          keep it only here, not in Home.tsx, so it never covers the fixed Scene canvas */}
      <div className="min-h-screen bg-[#08090b] text-white selection:bg-[#e3c091] selection:text-black antialiased">
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/work/:slug" element={<CaseStudy />} /> */}
          <Route path="*" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}