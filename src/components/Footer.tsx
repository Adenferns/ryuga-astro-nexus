import { Github, Instagram, Mail } from "lucide-react";

const Footer = () => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-space-darker border-t border-border/50 py-12">
      <div className="container mx-auto px-4">

        <div className="grid md:grid-cols-3 gap-8 mb-8 text-center md:text-left">

          {/* About */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-bold mb-4">Ryuga Aerospace</h3>
            <p className="text-sm text-muted-foreground max-w-xs">
              Building the future of aerospace technology through student innovation and collaboration.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => scrollToSection("about")}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("projects")}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Projects
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("team")}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Team
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-lg font-bold mb-4">Connect With Us</h4>

            <div className="flex gap-3 mb-4 justify-center md:justify-start">
              <a
                href="https://github.com/Adenferns"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-secondary/50 hover:bg-primary/20 hover:scale-110 transition-all duration-200"
              >
                <Github className="h-5 w-5" />
              </a>

              <a
                href="https://www.instagram.com/arc_pcce?igsh=czY3cHl6dHA5dnFp"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-secondary/50 hover:bg-primary/20 hover:scale-110 transition-all duration-200"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground justify-center md:justify-start">
              <Mail className="h-4 w-4" />
              <a
                href="mailto:ryuga.aerospace@gmail.com"
                className="hover:text-primary transition-colors"
              >
                ryuga.aerospace@gmail.com
              </a>
            </div>
          </div>

        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-border/50 text-center text-sm text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} Ryuga Aerospace. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;