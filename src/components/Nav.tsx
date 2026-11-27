import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

// `wide` links only show from lg up so the pill never overflows on tablets.
const links = [
  { to: "/#about", label: "Mission", wide: true },
  { to: "/#team", label: "Crew" },
  { to: "/#projects", label: "Projects", wide: true },
  { to: "/work", label: "Work" },
  { to: "/gallery", label: "Gallery" },
  { to: "/crew", label: "Portfolios", highlight: true },
];

const Nav = () => (
  <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
    <nav aria-label="Primary" className="glass flex h-[3.25rem] items-center gap-1 rounded-full py-1.5 pl-6 pr-1.5">
      <Link to="/#top" className="mr-4 font-display text-2xl leading-none tracking-[-0.01em]">
        Ryuga
      </Link>
      {links.map((l) => (
        <Link
          key={l.to}
          to={l.to}
          className={`${l.wide ? "hidden lg:flex" : "hidden md:flex"} items-center gap-2 rounded-full px-3.5 py-2 text-sm transition-colors duration-200 hover:text-foreground ${
            l.highlight ? "text-primary" : "text-muted-foreground"
          }`}
        >
          {l.highlight && <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-primary" />}
          {l.label}
        </Link>
      ))}
      <Button asChild size="sm" className="ml-2 h-10 px-5">
        <Link to="/#contact">Contact</Link>
      </Button>

      <Sheet>
        <SheetTrigger
          aria-label="Open menu"
          className="ml-1 inline-flex h-10 w-10 items-center justify-center rounded-full text-foreground transition-transform duration-150 active:scale-[0.95] md:hidden"
        >
          <Menu className="h-5 w-5" />
        </SheetTrigger>
        <SheetContent
          aria-describedby={undefined}
          className="glass w-[88vw] max-w-sm border-l border-white/10 bg-background/70 p-8 pt-20"
        >
          <SheetTitle className="sr-only">Menu</SheetTitle>
          <ul className="space-y-1">
            {links.map((l) => (
              <li key={l.to}>
                <SheetClose asChild>
                  <Link
                    to={l.to}
                    className={`flex items-center gap-3 py-2 font-display text-4xl leading-tight ${
                      l.highlight ? "text-primary" : "text-foreground"
                    }`}
                  >
                    {l.label}
                    {l.highlight && <span className="label">New</span>}
                  </Link>
                </SheetClose>
              </li>
            ))}
          </ul>
        </SheetContent>
      </Sheet>
    </nav>
  </header>
);

export default Nav;
