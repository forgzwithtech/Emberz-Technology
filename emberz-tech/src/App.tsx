import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

// --- HUD MINIMALISM THEME ---
const THEME = {
  bg: '#000000',          // Absolute zero black
  surface: 'rgba(255, 255, 255, 0.03)', // Frosted glass
  border: 'rgba(255, 255, 255, 0.1)',
  textMain: '#ffffff',
  textMuted: '#666666',
  accent: '#ff5e00',      // Emberz Core
  hudGreen: '#00ff66',    // System online indicator
};

const PROJECTS = [
  { id: '01', title: 'StreetPay', type: 'FINANCIAL INFRASTRUCTURE', status: 'ONLINE', img: 'radial-gradient(circle at 80% 50%, rgba(255, 94, 0, 0.15), transparent 50%)' },
  { id: '02', title: 'VisitONDO', type: 'DIGITAL ECOSYSTEM', status: 'ACTIVE', img: 'radial-gradient(circle at 80% 50%, rgba(0, 255, 102, 0.15), transparent 50%)' },
  { id: '03', title: 'Estate Engine', type: 'PROPERTY TECH', status: 'BUILDING', img: 'radial-gradient(circle at 80% 50%, rgba(0, 153, 255, 0.15), transparent 50%)' },
];

export default function App() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const { scrollYProgress } = useScroll();

  // Custom Reticle (Game Cursor)
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Global Parallax for the Background Grid
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background-color: ${THEME.bg}; color: ${THEME.textMain}; font-family: 'Inter', -apple-system, sans-serif; cursor: none; overflow-x: hidden; }
        ::-webkit-scrollbar { display: none; }
        
        /* The Video Game Scanline Effect */
        .scanlines {
          position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
          background: linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0) 50%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.1));
          background-size: 100% 4px; z-index: 999; pointer-events: none; opacity: 0.3;
        }
      `}</style>

      {/* --- CUSTOM RETICLE (CURSOR) --- */}
      <motion.div 
        style={styles.reticleDot}
        animate={{ x: mousePos.x - 2, y: mousePos.y - 2 }}
        transition={{ type: 'tween', ease: 'linear', duration: 0 }}
      />
      <motion.div 
        style={{...styles.reticleRing, borderColor: isHovering ? THEME.accent : THEME.textMuted }}
        animate={{ 
          x: mousePos.x - 20, 
          y: mousePos.y - 20,
          scale: isHovering ? 1.5 : 1,
          rotate: isHovering ? 45 : 0
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20, mass: 0.5 }}
      >
        {/* Reticle Crosshairs */}
        {isHovering && (
          <>
            <div style={{...styles.crosshair, top: -5, left: '50%', width: 1, height: 5}} />
            <div style={{...styles.crosshair, bottom: -5, left: '50%', width: 1, height: 5}} />
            <div style={{...styles.crosshair, left: -5, top: '50%', width: 5, height: 1}} />
            <div style={{...styles.crosshair, right: -5, top: '50%', width: 5, height: 1}} />
          </>
        )}
      </motion.div>

      <div className="scanlines" />
      <HUDOverlay />

      {/* Background Grid */}
      <motion.div style={{ ...styles.bgGrid, y: bgY }} />

      <main style={styles.mainContainer}>
        <HeroSequence onHover={() => setIsHovering(true)} onLeave={() => setIsHovering(false)} />
        <StageSelectPortfolio onHover={() => setIsHovering(true)} onLeave={() => setIsHovering(false)} />
        <ArsenalDataGrid onHover={() => setIsHovering(true)} onLeave={() => setIsHovering(false)} />
        <CommandCenter onHover={() => setIsHovering(true)} onLeave={() => setIsHovering(false)} />
      </main>
    </>
  );
}

// --- HUD (Heads Up Display) OVERLAY ---
function HUDOverlay() {
  return (
    <div style={styles.hudContainer}>
      <div style={styles.hudTopLeft}>
        <div style={styles.hudBracket}>[</div>
        <span>SYS.CORE // v2.0.26</span>
      </div>
      <div style={styles.hudTopRight}>
        <div style={styles.statusDot} />
        <span>NETWORK SECURE</span>
        <div style={styles.hudBracket}>]</div>
      </div>
      <div style={styles.hudBottomLeft}>
        <span>COORD: 7.2508° N, 5.2069° E</span>
      </div>
      <div style={styles.hudBottomRight}>
        <span>EMBERZ_TECH</span>
      </div>
    </div>
  );
}

// --- SCENE 1: THE HERO (Menu Screen) ---
function HeroSequence({ onHover, onLeave }: any) {
  return (
    <section style={styles.heroSection}>
      <div style={styles.heroContent}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }}
          style={styles.sysText}
        >
          // INITIALIZING
        </motion.div>
        
        {/* Apple Minimalism meets Game Title */}
        <motion.h1 
          initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          style={styles.heroTitle}
        >
          EMBERZ.
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.5 }}
          style={styles.heroSub}
        >
          We engineer enterprise software architecture and execute high-fidelity content strategies. No bloat. Pure performance.
        </motion.p>

        <motion.button 
          onMouseEnter={onHover} onMouseLeave={onLeave}
          whileHover={{ letterSpacing: '8px', backgroundColor: THEME.textMain, color: THEME.bg }}
          style={styles.startBtn}
        >
          START FORGE <span style={styles.blinkCursor}>_</span>
        </motion.button>
      </div>
    </section>
  );
}

// --- SCENE 2: STAGE SELECT (The Portfolio) ---
function StageSelectPortfolio({ onHover, onLeave }: any) {
  const [activeProject, setActiveProject] = useState(PROJECTS[0]);

  return (
    <section style={styles.portfolioSection}>
      {/* Dynamic Background based on selection */}
      <motion.div 
        key={activeProject.id}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}
        style={{ ...styles.portfolioBg, background: activeProject.img }} 
      />

      <div style={styles.portfolioLayout}>
        {/* Left: The Menu List */}
        <div style={styles.menuList}>
          <div style={styles.sysText}>// SELECT DEPLOYMENT</div>
          
          {PROJECTS.map((proj) => (
            <motion.div 
              key={proj.id}
              onMouseEnter={() => { setActiveProject(proj); onHover(); }}
              onMouseLeave={onLeave}
              style={{
                ...styles.menuItem,
                color: activeProject.id === proj.id ? THEME.textMain : THEME.textMuted,
                borderLeft: activeProject.id === proj.id ? `4px solid ${THEME.accent}` : '4px solid transparent',
              }}
            >
              <span style={styles.menuId}>{proj.id}</span>
              <h2 style={styles.menuTitle}>{proj.title}</h2>
            </motion.div>
          ))}
        </div>

        {/* Right: The Data View (Apple Glassmorphism) */}
        <div style={styles.dataView}>
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeProject.id}
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}
              style={styles.dataCard}
            >
              <div style={styles.dataHeader}>
                <span style={styles.dataType}>{activeProject.type}</span>
                <span style={styles.dataStatus}>[{activeProject.status}]</span>
              </div>
              
              {/* Image Placeholder Frame - Apple Pro Display style */}
              <div style={styles.imageFrame}>
                <div style={styles.imagePlaceholderText}>[ RENDER {activeProject.title} UI HERE ]</div>
              </div>
              
              <button style={styles.ghostBtn} onMouseEnter={onHover} onMouseLeave={onLeave}>
                ACCESS DATA
              </button>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

// --- SCENE 3: ARSENAL DATA GRID (Services) ---
function ArsenalDataGrid({ onHover, onLeave }: any) {
  return (
    <section style={styles.arsenalSection}>
      <div style={styles.sysText}>// CAPABILITIES_LOADOUT</div>
      
      <div style={styles.gridContainer}>
        {[
          { title: '.NET Architecture', desc: 'High-throughput, secure backend infrastructure built for enterprise scale.' },
          { title: 'React Native', desc: 'Fluid, cross-platform mobile ecosystems that feel undeniably native.' },
          { title: 'The Content Forge', desc: 'Aggressive brand positioning and viral mechanics for X, TikTok, and IG.' },
          { title: 'UI/UX Design', desc: 'Cinematic, conversion-optimized interfaces that command user attention.' }
        ].map((item, i) => (
          <motion.div 
            key={i}
            onMouseEnter={onHover} onMouseLeave={onLeave}
            whileHover={{ scale: 0.98, backgroundColor: 'rgba(255,255,255,0.08)' }}
            style={styles.dataBlock}
          >
            <div style={styles.blockCornerTopLeft} />
            <div style={styles.blockCornerBottomRight} />
            <h3 style={styles.blockTitle}>{item.title}</h3>
            <p style={styles.blockDesc}>{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// --- SCENE 4: COMMAND CENTER (Contact) ---
function CommandCenter({ onHover, onLeave }: any) {
  return (
    <section style={styles.commandSection}>
      <div style={styles.commandInner}>
        <h1 style={styles.commandTitle}>Awaiting <br/>Directives.</h1>
        <p style={styles.heroSub}>Initialize a communication link to discuss architecture, timelines, and deployment strategies.</p>
        <motion.button 
          onMouseEnter={onHover} onMouseLeave={onLeave}
          whileHover={{ scale: 1.05, boxShadow: `0 0 20px ${THEME.accent}66` }}
          style={styles.actionBtn}
        >
          ESTABLISH COMMS
        </motion.button>
      </div>
    </section>
  );
}

// --- UI STYLES ---
const styles: { [key: string]: React.CSSProperties } = {
  mainContainer: { position: 'relative', zIndex: 10, padding: '0 5vw' },
  
  // Custom Reticle
  reticleDot: { position: 'fixed', top: 0, left: 0, width: '4px', height: '4px', backgroundColor: THEME.textMain, borderRadius: '50%', pointerEvents: 'none', zIndex: 10000 },
  reticleRing: { position: 'fixed', top: 0, left: 0, width: '40px', height: '40px', border: `1px solid ${THEME.textMuted}`, borderRadius: '50%', pointerEvents: 'none', zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center' },
  crosshair: { position: 'absolute', backgroundColor: THEME.accent },

  // Background Grid (Game Vibe)
  bgGrid: { position: 'fixed', top: '-50%', left: '-50%', width: '200%', height: '200%', backgroundImage: `linear-gradient(${THEME.border} 1px, transparent 1px), linear-gradient(90deg, ${THEME.border} 1px, transparent 1px)`, backgroundSize: '50px 50px', opacity: 0.3, zIndex: 0, pointerEvents: 'none', transform: 'perspective(500px) rotateX(60deg) translateY(-100px)' },

  // HUD Overlay
  hudContainer: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none', zIndex: 100, padding: '30px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', fontFamily: '"Fira Code", monospace', fontSize: '0.7rem', color: THEME.textMuted, letterSpacing: '2px' },
  hudTopLeft: { position: 'absolute', top: '30px', left: '30px', display: 'flex', alignItems: 'center', gap: '10px' },
  hudTopRight: { position: 'absolute', top: '30px', right: '30px', display: 'flex', alignItems: 'center', gap: '10px' },
  hudBottomLeft: { position: 'absolute', bottom: '30px', left: '30px' },
  hudBottomRight: { position: 'absolute', bottom: '30px', right: '30px' },
  hudBracket: { fontSize: '1rem', color: THEME.textMain, fontWeight: 300 },
  statusDot: { width: '6px', height: '6px', backgroundColor: THEME.hudGreen, borderRadius: '50%', boxShadow: `0 0 8px ${THEME.hudGreen}`, animation: 'pulse 2s infinite' },

  // Shared Typography
  sysText: { fontFamily: '"Fira Code", monospace', fontSize: '0.8rem', color: THEME.accent, letterSpacing: '4px', marginBottom: '20px' },
  
  // Hero
  heroSection: { height: '100vh', display: 'flex', alignItems: 'center', maxWidth: '1200px', margin: '0 auto' },
  heroContent: { maxWidth: '800px' },
  heroTitle: { fontSize: 'clamp(5rem, 12vw, 10rem)', fontWeight: 900, letterSpacing: '-0.05em', lineHeight: 0.9, margin: '0 0 30px 0' },
  heroSub: { fontSize: 'clamp(1rem, 2vw, 1.2rem)', color: THEME.textMuted, lineHeight: 1.6, maxWidth: '600px', marginBottom: '50px' },
  startBtn: { background: 'transparent', color: THEME.textMain, border: `1px solid ${THEME.border}`, padding: '16px 32px', fontSize: '0.9rem', fontFamily: '"Fira Code", monospace', letterSpacing: '4px', cursor: 'none', transition: 'all 0.3s' },
  blinkCursor: { animation: 'blink 1s step-end infinite' },

  // Portfolio (Stage Select)
  portfolioSection: { minHeight: '100vh', display: 'flex', alignItems: 'center', position: 'relative', paddingTop: '100px', maxWidth: '1400px', margin: '0 auto' },
  portfolioBg: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: -1, pointerEvents: 'none', filter: 'blur(100px)' },
  portfolioLayout: { display: 'flex', width: '100%', gap: '5vw', flexWrap: 'wrap' },
  
  menuList: { flex: '1 1 300px', display: 'flex', flexDirection: 'column', gap: '10px' },
  menuItem: { padding: '20px', cursor: 'none', display: 'flex', alignItems: 'center', gap: '20px', backgroundColor: 'transparent', transition: 'all 0.2s' },
  menuId: { fontFamily: '"Fira Code", monospace', fontSize: '0.9rem', opacity: 0.5 },
  menuTitle: { fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 800, letterSpacing: '-0.03em', textTransform: 'uppercase' },

  dataView: { flex: '1 1 500px', display: 'flex', alignItems: 'center' },
  dataCard: { width: '100%', backgroundColor: THEME.surface, backdropFilter: 'blur(20px)', border: `1px solid ${THEME.border}`, borderRadius: '16px', padding: '30px' },
  dataHeader: { display: 'flex', justifyContent: 'space-between', fontFamily: '"Fira Code", monospace', fontSize: '0.8rem', color: THEME.textMuted, marginBottom: '20px', borderBottom: `1px solid ${THEME.border}`, paddingBottom: '10px' },
  dataType: { color: THEME.textMain },
  dataStatus: { color: THEME.hudGreen },
  
  imageFrame: { width: '100%', aspectRatio: '16/9', backgroundColor: '#050505', border: `1px solid #222`, borderRadius: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '30px' },
  imagePlaceholderText: { fontFamily: '"Fira Code", monospace', fontSize: '0.8rem', color: '#444' },
  ghostBtn: { width: '100%', background: 'transparent', color: THEME.textMain, border: `1px solid ${THEME.border}`, padding: '16px', fontSize: '0.8rem', fontFamily: '"Fira Code", monospace', letterSpacing: '2px', cursor: 'none' },

  // Arsenal (Grid)
  arsenalSection: { minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', maxWidth: '1200px', margin: '0 auto', paddingTop: '100px' },
  gridContainer: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' },
  dataBlock: { position: 'relative', backgroundColor: THEME.surface, border: `1px solid ${THEME.border}`, padding: '40px', cursor: 'none' },
  blockCornerTopLeft: { position: 'absolute', top: -1, left: -1, width: '10px', height: '10px', borderTop: `2px solid ${THEME.textMuted}`, borderLeft: `2px solid ${THEME.textMuted}` },
  blockCornerBottomRight: { position: 'absolute', bottom: -1, right: -1, width: '10px', height: '10px', borderBottom: `2px solid ${THEME.textMuted}`, borderRight: `2px solid ${THEME.textMuted}` },
  blockTitle: { fontSize: '1.5rem', fontWeight: 700, marginBottom: '15px' },
  blockDesc: { color: THEME.textMuted, lineHeight: 1.6 },

  // Command Center (Footer)
  commandSection: { height: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' },
  commandInner: { maxWidth: '800px', display: 'flex', flexDirection: 'column', alignItems: 'center' },
  commandTitle: { fontSize: 'clamp(4rem, 8vw, 6rem)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1, marginBottom: '30px' },
  actionBtn: { backgroundColor: THEME.accent, color: '#fff', border: 'none', padding: '20px 40px', fontSize: '1rem', fontFamily: '"Fira Code", monospace', letterSpacing: '4px', cursor: 'none' },
};