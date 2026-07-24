const Footer = () => (
  <footer className="border-t border-white/5 py-10">
    <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-6 text-sm text-slate-500 sm:flex-row sm:justify-between sm:px-8">
      <p>© {new Date().getFullYear()} Elian Barra. Built with React &amp; Tailwind CSS.</p>
      <a href="mailto:elianbarra@gmail.com" className="font-mono transition hover:text-accent">
        elianbarra@gmail.com
      </a>
    </div>
  </footer>
);

export default Footer;
