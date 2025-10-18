import { User, Github, Linkedin, Mail } from "lucide-react";

const team = [
  {
    name: "Aden Fernades",
    role: "Team Lead & Aerospace Engineer",
    bio: "Specializing in flight dynamics and control systems",
  },
  {
    name: "Yash Shaw",
    role: "Robotics Lead",
    bio: "Expert in autonomous systems and sensor fusion",
  },
  {
    name: "Alister Fernandes",
    role: "AI & Machine Learning",
    bio: "Deep learning for computer vision and navigation",
  },
  {
    name: "Snidon Andrade",
    role: "Electronics Engineer",
    bio: "PCB design and embedded systems development",
  },
  {
    name: "David Park",
    role: "Software Architect",
    bio: "Full-stack development and system integration",
  },
  {
    name: "Lisa Wang",
    role: "Project Manager",
    bio: "Coordinating teams and ensuring timely deliverables",
  },
];

const Team = () => {
  return (
    <section id="team" className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Meet Our Team</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Talented students passionate about aerospace and innovation
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <div
              key={member.name}
              className="group p-6 rounded-xl bg-gradient-card backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <User className="h-12 w-12 text-primary" />
                </div>
                
                <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                <p className="text-primary text-sm mb-3">{member.role}</p>
                <p className="text-muted-foreground text-sm mb-4">{member.bio}</p>

                <div className="flex gap-3">
                  <button className="p-2 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors">
                    <Github className="h-4 w-4" />
                  </button>
                  <button className="p-2 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors">
                    <Linkedin className="h-4 w-4" />
                  </button>
                  <button className="p-2 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors">
                    <Mail className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
