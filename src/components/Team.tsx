import { User, Github, Linkedin, Mail } from "lucide-react";
import YashPhoto from "../assets/Teamphotos/yash.jpeg";
import AdenPhoto from "../assets/Teamphotos/aden.jpeg";
import AlisterPhoto from "../assets/Teamphotos/alister.jpeg";
import SnidonPhoto from "../assets/Teamphotos/snidon.jpeg";

const team = [
  {
    name: "Aden Fernades",
    role: "Deeplearning and AI Engineer",
    bio: "Deep learning for computer vision and navigation",
    photo: AdenPhoto,
    Github: "https://github.com/Adenferns",
    Linkedin: "https://www.linkedin.com/in/adenfernandes6",
    email: "mailto:adenfernandes6@gmail.com",
  },
  {
    name: "Yash Shaw",
    role: "Aerospace and UAV Engineer",
    bio: "Expert in autonomous systems and sensor fusion",
    photo: YashPhoto,
    Github: "https://github.com/INFINIX2004",
    Linkedin: "https://www.linkedin.com/in/yash-shaw-607188250/",
    email: "mailto:yg.shaw2004@gmail.com",
  },
  {
    name: "Alister Fernandes",
    role: "Robotics Lead",
    bio: "PCB design and embedded systems development",
    photo: AlisterPhoto,
    Github: "https://github.com/INFINIX2004",
    Linkedin: "https://www.linkedin.com/in/alister-fernandes-4a7239317",
    email: "mailto:alisterbhp@gmail.com",
  },
  {
    name: "Snidon Andrade",
    role: "Software Engineer",
    bio: "Full-stack development and system integration",
    photo:SnidonPhoto,
    Github: "https://github.com/Snidon06",
    Linkedin: "https://www.linkedin.com/in/snidon-andrade-90627a330",
    email: "mailto:snidonandrade06@gmail.com",
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
                    <div className="w-32 h-32 rounded-full overflow-hidden mb-4 group-hover:ring-2 group-hover:ring-primary/30 transition-all">
                    <img
                        src={member.photo}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                </div>
                
                <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                <p className="text-primary text-sm mb-3">{member.role}</p>
                <p className="text-muted-foreground text-sm mb-4">{member.bio}</p>

                <div className="flex gap-3">
                <a
                  href={member.Github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
                >
                  <Github className="h-4 w-4" />
                </a>

                <a
                  href={member.Linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
                >
                  <Linkedin className="h-4 w-4" />
                </a>

                <a
                  href={`mailto:${member.email}`}
                  className="p-2 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
                >
                  <Mail className="h-4 w-4" />
                </a>
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
