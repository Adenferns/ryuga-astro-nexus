import { useState } from "react";
import { Calendar, Trophy, BookOpen } from "lucide-react";

const news = [
  {
    date: "February 28th, 2025",
    title: "Won Ideas 2026 Most Innovative Project Award",
    description:
      "Won the 'Most Innovative Project' award at Ideas 2026 for our project on autonomous drone development.",
    icon: BookOpen,
  },
  {
    date: "February 24th, 2025",
    title: "Young Innovators Challenge (Prototype Runners Up)",
    description:
      "Second Place for their prototype 'Aerovision' in the Young Innovators Challenge at Converge 3.0.",
    icon: BookOpen,
  },
  {
    date: "February 13th, 2025",
    title: "Drone Workshop For Agenl Students",
    description:
      "Successfully conducted a workshop for Agenl students on drone programming and development.",
    icon: BookOpen,
  },
  {
    date: "December 17th, 2025",
    title: "Goa Government’s Campus Innovation Scheme",
    description:
      "Under Goa Startup Policy 2025, provides up to ₹50,000 reimbursement for student projects.",
    icon: BookOpen,
  },
  {
    date: "November 15th, 2025",
    title: "Techgium Finalist",
    description: "Reached the final round of Techgium 2026.",
    icon: BookOpen,
  },
  {
    date: "September 25th, 2025",
    title: "Goa Innovation Challenge",
    description:
      "Secured top 30 rank teams in Goa Innovation Challenge organised by Department of IT.",
    icon: Trophy,
  },
  {
    date: "August 7th, 2025",
    title: "Working Under Center For Drone Application (CDA) @ IIT Goa",
    description:
      "Developing and researching VIO, VSLAM, ROS and other algorithms in drones.",
    icon: Calendar,
  },
];

const News = () => {
  const [showAll, setShowAll] = useState(false);
  const visibleNews = showAll ? news : news.slice(0, 4);

  return (
    <section id="news" className="py-16 md:py-24 bg-space-dark">
      <div className="container mx-auto px-4">

        {/* Heading */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4">
            News & Achievements
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Our journey of innovation and milestones
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative max-w-5xl mx-auto">

          {/* Vertical Line */}
          <div className="absolute left-5 md:left-1/2 md:-translate-x-1/2 w-1 bg-primary/30 h-full"></div>

          {visibleNews.map((item, index) => {
            const Icon = item.icon;
            const isLeft = index % 2 === 0;

            return (
              <div
                key={index}
                className={`relative mb-12 flex ${
                  isLeft ? "md:justify-start" : "md:justify-end"
                } justify-start`}
              >
                {/* Card */}
                <div className="ml-12 md:ml-0 w-full md:w-5/12 bg-gradient-card border border-border/50 p-5 rounded-xl hover:border-primary/50 transition-all duration-300">
                  <div className="text-xs md:text-sm text-muted-foreground mb-2">
                    {item.date}
                  </div>
                  <h3 className="text-base md:text-xl font-bold mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs md:text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>

                {/* Icon */}
                <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary flex items-center justify-center">
                  <Icon className="h-4 w-4 md:h-5 md:w-5 text-white" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Show More Button */}
        {news.length > 4 && (
          <div className="text-center mt-8">
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-5 py-2 bg-primary text-white rounded-lg hover:bg-primary/80 transition"
            >
              {showAll ? "Show Less" : "View More"}
            </button>
          </div>
        )}

      </div>
    </section>
  );
};

export default News;