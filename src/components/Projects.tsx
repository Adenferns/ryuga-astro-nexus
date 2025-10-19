import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Cpu, Plane, Satellite, Brain } from "lucide-react";

const categories = ["All", "Drones", "Robotics", "AI", "Space Tech"];

const projects = [
  {
    id: 1,
    title: "Gps Denied Drone",
    category: "Drones",
    description: "AI-powered drone system for autonomously navigates in gps Denied Environments with obstacle avoidance and real-time path planning.",
    technologies: ["ROS", "Computer Vision", "Python", "GPS Navigation"],
    icon: Plane,
  },
  {
    id: 2,
    title: "Visual Clues Guided Autonmous Indoor Navigation Drone",
    category: "Drones",
    description: "Drone Capable of Navigating Through indoor Environments",
    technologies: ["Python", "Multi-Agent Systems", "ROS2", "Deeplearning"],
    icon: Cpu,
  },
  {
    id: 3,
    title: "Energy Efficient Vtol",
    category: "Space Tech",
    description: "Hybird Plane Designed to have longer flight time.",
    technologies: ["Embedded C", "Radio Communications", "PCB", "Data Analysis"],
    icon: Satellite,
  },
  {
    id: 4,
    title: "SAR: Human Search and Rescue Drone",
    category: "AI",
    description: "Deep learning CNN based drone for detection and tracking of humans and giving their gps positions.",
    technologies: ["TensorFlow", "PyTorch", "OpenCV", "YOLO"],
    icon: Brain,
  },
  {
    id: 5,
    title: "Garbage Detecion in Beaches using drone",
    category: "Drones",
    description: "Drone Designed specifically to fly in Beach Environment and Detect Garbage.",
    technologies: ["PID Control", "IMU Sensors", "Telemetry", "Flight Controller"],
    icon: Plane,
  },
  {
    id: 6,
    title: "Budget Friendly ESP Drone",
    category: "Robotics",
    description: "Affordable and Wifi Controlled ESP drone ",
    technologies: ["ROS", "SLAM", "Suspension Design", "Remote Control"],
    icon: Cpu,
  },
];

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProjects = selectedCategory === "All" 
    ? projects 
    : projects.filter(p => p.category === selectedCategory);

  return (
    <section id="projects" className="py-24 bg-space-dark relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Projects</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Innovative solutions pushing the boundaries of aerospace technology
          </p>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "secondary"}
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? "bg-primary" : ""}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => {
            const Icon = project.icon;
            return (
              <div
                key={project.id}
                className="group p-6 rounded-xl bg-gradient-card backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Icon className="h-7 w-7 text-primary" />
                </div>

                <Badge variant="secondary" className="mb-3">
                  {project.category}
                </Badge>

                <h3 className="text-xl font-bold mb-3">{project.title}</h3>
                <p className="text-muted-foreground mb-4 text-sm">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs px-2 py-1 rounded-md bg-secondary/50 text-secondary-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;
