import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Users, Code, Wrench, Rocket } from "lucide-react";

const positions = [
  { icon: Code, title: "Software Developer", description: "Build control systems and Debugging" },
  { icon: Wrench, title: "Hardware Engineer", description: "Design and fabricate mechanical systems" },
  { icon: Rocket, title: "Machine Learning Engineer", description: "Build ML Algorithm" },
  { icon: Users, title: "Project Manager", description: "Coordinate teams and manage timelines" },
];

const Join = () => {
  const { toast } = useToast();

  // State for form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [institution, setInstitution] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:3000/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, institution, message }),
      });

      const data = await res.json();

      if (data.success) {
        toast({
          title: "Application Submitted!",
          description: data.message,
        });

        // Reset form
        setName("");
        setEmail("");
        setInstitution("");
        setMessage("");
      } else {
        toast({
          title: "Submission Failed",
          description: data.message || "Please try again.",
        });
      }
    } catch (err) {
      console.error(err);
      toast({
        title: "Server Error",
        description: "Could not submit your application. Try again later.",
      });
    } finally {
      setLoading(false);
    }
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
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-secondary/50 border-border"
                />
              </div>
              <div>
                <Input
                  type="email"
                  placeholder="Email Address"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-secondary/50 border-border"
                />
              </div>
              <div>
                <Input
                  placeholder="University / Institution"
                  required
                  value={institution}
                  onChange={(e) => setInstitution(e.target.value)}
                  className="bg-secondary/50 border-border"
                />
              </div>
              <div>
                <Textarea
                  placeholder="Tell us why you want to join and what skills you bring..."
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="bg-secondary/50 border-border min-h-32"
                />
              </div>
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-primary hover:bg-primary/90"
              >
                {loading ? "Submitting..." : "Submit Application"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Join;
