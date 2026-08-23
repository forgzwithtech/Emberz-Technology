import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "../../assets/logo.png";

const LINKS = [
  { label: "Work", href: "#work" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled ? "py-3 bg-black/60 backdrop-blur-md border-b border-[#7c8a99]/10" : "py-6 bg-transparent"
      }`}
    >
      <nav className="px-6 sm:px-12 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <img src={logo} alt="Emberz Technology" className="h-7 sm:h-8 w-auto" />
        </Link>

        <ul className="hidden md:flex items-center gap-8">
          {LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="text-xs font-mono uppercase tracking-widest text-zinc-400 hover:text-[#e3c091] transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="hidden md:inline-flex items-center px-5 py-2 rounded-full border border-white/10 text-xs font-mono uppercase tracking-widest text-white hover:bg-[#e3c091] hover:text-black hover:border-[#e3c091] transition-all"
        >
          Start a Project
        </a>

        <button
          className="md:hidden text-white"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {menuOpen && (
        <div className="md:hidden mt-4 px-6 pb-6 flex flex-col gap-4 bg-black/80 backdrop-blur-md">
          {LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-sm font-mono uppercase tracking-widest text-zinc-300"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}