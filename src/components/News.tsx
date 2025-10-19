import { Calendar, Trophy, BookOpen } from "lucide-react";

const news = [
  {
    date: "September 25th, 2025",
    title: "Goa Innovtion Challenge",
    description: "Secured in top 30 rank teams in Goa Innovation Challenge Organised by  Department of IT and Communivation Cell Goa",
    icon: Trophy,
  },
  {
    date: "August 7th, 2025",
    title: "Working Under Center For Drone Application(CDA) @IIT GOA,Ponda,Goa",
    description: "Developing and Researching VIO,VSLAM,ROS and other algorithms in Drones",
    icon: Calendar,
  },
  {
    date: "June 20th, 2025",
    title: "Workshop: Introduction to Drone Programming",
    description: "Successfully conducted a workshop attended by 60+ students on autonomous drone development.",
    icon: BookOpen,
  },
  {
    date: "March 15th, 2025",
    title: "Presented At Inex ",
    description: "Presented our Project at International Innovation & Invention Expo (INEX)",
    icon: Calendar,
  },
  {
    date: "January 20, 2025",
    title: "Praticipated At Ideas 2025",
    description: "Secured IN top 20 Team team in Collge Level Project Competition",
    icon: Trophy,
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
