import { Target, Eye, Award } from "lucide-react";

const About = () => {
  return (
    <section id="about" className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">About Ryuga-Aerospace</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Pioneering the next generation of aerospace and robotics innovation through student collaboration
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="p-8 rounded-xl bg-gradient-card backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all duration-300 group">
            <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
              <Target className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
            <p className="text-muted-foreground">
              To empower students with hands-on experience in cutting-edge aerospace technologies, fostering innovation and technical excellence in drone systems, robotics, and space exploration.
            </p>
          </div>

          <div className="p-8 rounded-xl bg-gradient-card backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all duration-300 group">
            <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
              <Eye className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
            <p className="text-muted-foreground">
              To become a leading student organization recognized globally for groundbreaking aerospace innovations and contributing to the advancement of space technology and autonomous systems.
            </p>
          </div>

          <div className="p-8 rounded-xl bg-gradient-card backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all duration-300 group">
            <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
              <Award className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Key Achievements</h3>
            <p className="text-muted-foreground">
              8 national awards in robotics competitions, successful deployment of 10+ drone systems, published research in autonomous navigation, and partnerships with leading aerospace companies.
            </p>
          </div>
        </div>

        <div className="text-center p-8 rounded-xl bg-gradient-card backdrop-blur-sm border border-primary/30">
          <p className="text-lg text-muted-foreground max-w-4xl mx-auto">
            Founded by a group of passionate students, Ryuga-Aerospace has grown into a thriving community of engineers, programmers, and innovators. 
            We work on projects spanning drone technology, AI-powered robotics, rocket propulsion systems, and satellite development.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
