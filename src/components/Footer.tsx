import { Link } from "react-router-dom";
import { Github, Instagram } from "lucide-react";

const links = [
  { to: "/#about", label: "Mission" },
  { to: "/#team", label: "Crew" },
  { to: "/work", label: "Work" },
  { to: "/gallery", label: "Gallery" },
  { to: "/#contact", label: "Contact" },
];

const iconLink =
  "inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-muted-foreground transition-[transform,color,border-color] duration-200 hover:border-primary/50 hover:text-foreground active:scale-[0.97]";

const Footer = () => (
  <footer className="overflow-hidden border-t border-white/10">
    <div className="container flex flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between">
      <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2">
        {links.map((l) => (
          <Link
            key={l.to}
            to={l.to}
            className="text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
          >
            {l.label}
          </Link>
        ))}
      </nav>
      <div className="flex gap-2">
        <a
          href="https://github.com/Adenferns"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className={iconLink}
        >
          <Github className="h-4 w-4" />
        </a>
        <a
          href="https://www.instagram.com/arc_pcce?igsh=czY3cHl6dHA5dnFp"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className={iconLink}
        >
          <Instagram className="h-4 w-4" />
        </a>
      </div>
    </div>

    <p
      aria-hidden
      className="select-none whitespace-nowrap text-center font-display text-[26vw] font-normal leading-[0.8] tracking-[-0.04em] text-white/[0.045]"
    >
      Ryuga
    </p>
    <p className="label container pb-6 text-center">
      &copy; {new Date().getFullYear()} Ryuga Aerospace
    </p>
  </footer>
);

export default Footer;
