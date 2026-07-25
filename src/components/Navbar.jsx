import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher.jsx";

const linkClasses = ({ isActive }) =>
  `font-mono text-sm transition-colors ${
    isActive ? "text-accent" : "text-slate-300 hover:text-white"
  }`;

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  const links = [
    { to: "/", label: t("nav.home"), index: "01" },
    { to: "/about", label: t("nav.about"), index: "02" },
    { to: "/works", label: t("nav.projects"), index: "03" },
    { to: "/contact", label: t("nav.contact"), index: "04" },
  ];

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

        <div className="hidden items-center gap-4 sm:flex">
          <LanguageSwitcher />
        </div>

        <button
          type="button"
          aria-label={t("nav.toggleMenu")}
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
        <div className="flex flex-col gap-1 border-t border-white/5 px-6 pb-4 sm:hidden">
          <ul className="flex flex-col gap-1">
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
          <LanguageSwitcher className="mt-2 w-fit" />
        </div>
      )}
    </header>
  );
};

export default Navbar;
