import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Users, Code, Wrench, Rocket } from "lucide-react";

const positions = [
  {
    icon: Code,
    title: "Software Developer",
    description: "Build control systems and AI algorithms",
  },
  {
    icon: Wrench,
    title: "Hardware Engineer",
    description: "Design and fabricate mechanical systems",
  },
  {
    icon: Rocket,
    title: "Aerospace Engineer",
    description: "Work on propulsion and flight dynamics",
  },
  {
    icon: Users,
    title: "Project Manager",
    description: "Coordinate teams and manage timelines",
  },
];

const Join = () => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Application Submitted!",
      description: "We'll review your application and get back to you soon.",
    });
  };

  return (
    <section id="join" className="py-24 bg-space-dark relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Join Our Team</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Be part of the next generation of aerospace innovators
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Open Positions */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold mb-6">Open Positions</h3>
            {positions.map((position, index) => {
              const Icon = position.icon;
              return (
                <div
                  key={index}
                  className="p-6 rounded-xl bg-gradient-card backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all duration-300 group"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors flex-shrink-0">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold mb-1">{position.title}</h4>
                      <p className="text-muted-foreground text-sm">{position.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Application Form */}
          <div className="p-8 rounded-xl bg-gradient-card backdrop-blur-sm border border-border/50">
            <h3 className="text-2xl font-bold mb-6">Apply Now</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input 
                  placeholder="Full Name" 
                  required 
                  className="bg-secondary/50 border-border"
                />
              </div>
              <div>
                <Input 
                  type="email" 
                  placeholder="Email Address" 
                  required 
                  className="bg-secondary/50 border-border"
                />
              </div>
              <div>
                <Input 
                  placeholder="University / Institution" 
                  required 
                  className="bg-secondary/50 border-border"
                />
              </div>
              <div>
                <Textarea 
                  placeholder="Tell us why you want to join and what skills you bring..."
                  required
                  className="bg-secondary/50 border-border min-h-32"
                />
              </div>
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                Submit Application
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Join;
