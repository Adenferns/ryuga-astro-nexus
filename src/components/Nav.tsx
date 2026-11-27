import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const links = [
  { to: "/#about", label: "Mission" },
  { to: "/#team", label: "Crew" },
  { to: "/#projects", label: "Projects" },
  { to: "/work", label: "Work" },
  { to: "/gallery", label: "Gallery" },
];

const Nav = () => (
  <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
    <nav
      aria-label="Primary"
      className="glass flex h-[3.25rem] items-center gap-1 rounded-full py-1.5 pl-6 pr-1.5"
    >
      <Link to="/#top" className="mr-4 font-display text-2xl leading-none tracking-[-0.01em]">
        Ryuga
      </Link>
      {links.map((l) => (
        <Link
          key={l.to}
          to={l.to}
          className="hidden rounded-full px-3.5 py-2 text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground md:block"
        >
          {l.label}
        </Link>
      ))}
      <Button asChild size="sm" className="ml-2 h-10 px-5">
        <Link to="/#contact">Contact</Link>
      </Button>
    </nav>
  </header>
);

export default Nav;
