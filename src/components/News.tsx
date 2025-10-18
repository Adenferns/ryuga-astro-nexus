import { Calendar, Trophy, BookOpen } from "lucide-react";

const news = [
  {
    date: "March 15, 2024",
    title: "First Place at National Robotics Championship",
    description: "Our autonomous swarm robotics team secured the top position competing against 50+ universities.",
    icon: Trophy,
  },
  {
    date: "February 28, 2024",
    title: "Workshop: Introduction to Drone Programming",
    description: "Successfully conducted a 3-day workshop attended by 100+ students on autonomous drone development.",
    icon: BookOpen,
  },
  {
    date: "February 10, 2024",
    title: "CubeSat Project Launch Approval",
    description: "Received approval for our CubeSat mission to study atmospheric conditions in low Earth orbit.",
    icon: Calendar,
  },
  {
    date: "January 20, 2024",
    title: "Published Research Paper on AI Navigation",
    description: "Our research on deep learning-based obstacle avoidance was published in IEEE Robotics Conference.",
    icon: BookOpen,
  },
];

const News = () => {
  return (
    <section id="news" className="py-24 bg-space-dark relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">News & Updates</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Stay updated with our latest achievements and events
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {news.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="group p-6 rounded-xl bg-gradient-card backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="text-sm text-muted-foreground mb-2">{item.date}</div>
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default News;
