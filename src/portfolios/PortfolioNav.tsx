import { Link } from "react-router-dom";
import { ArrowLeft, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

export type NavLink = { href: string; label: string };

/** Floating pill shared by every crew portfolio. Inline links from md up; a sheet menu on phones. */
export const PortfolioNav = ({ name, links }: { name: string; links: NavLink[] }) => (
  <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
    <nav aria-label="Portfolio" className="glass flex h-[3.25rem] items-center gap-1 rounded-full py-1.5 pl-2 pr-1.5">
      <Link
        to="/crew"
        aria-label="Back to the crew"
        className="inline-flex h-10 items-center gap-2 rounded-full px-3 text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> <span className="hidden sm:inline">Crew</span>
      </Link>
      <a href="#top" className="mx-2 font-display text-xl leading-none tracking-[-0.01em]">
        {name}
      </a>
      {links.map((l) => (
        <a
          key={l.href}
          href={l.href}
          className="hidden rounded-full px-3.5 py-2 text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground md:block"
        >
          {l.label}
        </a>
      ))}
      <Button asChild size="sm" className="ml-1 h-10 px-5">
        <a href="#contact">Contact</a>
      </Button>
      <Sheet>
        <SheetTrigger
          aria-label="Open sections"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full transition-transform duration-150 active:scale-[0.95] md:hidden"
        >
          <Menu className="h-5 w-5" />
        </SheetTrigger>
        <SheetContent aria-describedby={undefined} className="glass w-[88vw] max-w-sm border-l border-white/10 bg-background/70 p-8 pt-20">
          <SheetTitle className="sr-only">Sections</SheetTitle>
          <ul className="space-y-1">
            {[{ href: "#top", label: "Intro" }, ...links, { href: "#contact", label: "Contact" }].map((l) => (
              <li key={l.href}>
                <SheetClose asChild>
                  <a href={l.href} className="block py-2 font-display text-4xl leading-tight">
                    {l.label}
                  </a>
                </SheetClose>
              </li>
            ))}
          </ul>
        </SheetContent>
      </Sheet>
    </nav>
  </header>
);
