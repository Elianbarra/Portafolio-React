import { useState } from "react";
import { NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Home", index: "01" },
  { to: "/about", label: "About", index: "02" },
  { to: "/works", label: "Projects", index: "03" },
  { to: "/contact", label: "Contact", index: "04" },
];

const linkClasses = ({ isActive }) =>
  `font-mono text-sm transition-colors ${
    isActive ? "text-accent" : "text-slate-300 hover:text-white"
  }`;

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-ink-950/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-8">
        <NavLink to="/" className="font-mono text-lg font-semibold text-white" onClick={() => setOpen(false)}>
          Elian<span className="text-accent">.</span>Barra
        </NavLink>

        <ul className="hidden items-center gap-8 sm:flex">
          {links.map((link) => (
            <li key={link.to}>
              <NavLink to={link.to} end={link.to === "/"} className={linkClasses}>
                <span className="text-accent/70">{link.index}</span> {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((prev) => !prev)}
          className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 sm:hidden"
        >
          <span className={`h-px w-6 bg-slate-200 transition ${open ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`h-px w-6 bg-slate-200 transition ${open ? "opacity-0" : ""}`} />
          <span className={`h-px w-6 bg-slate-200 transition ${open ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
      </nav>

      {open && (
        <ul className="flex flex-col gap-1 border-t border-white/5 px-6 pb-4 sm:hidden">
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.to === "/"}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `block rounded-lg px-3 py-2.5 font-mono text-sm ${
                    isActive ? "bg-white/5 text-accent" : "text-slate-300"
                  }`
                }
              >
                <span className="text-accent/70">{link.index}</span> {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
};

export default Navbar;
