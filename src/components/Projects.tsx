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
    description:
      "AI-powered drone system for autonomous navigation in GPS-denied environments with obstacle avoidance.",
    technologies: ["ROS", "Computer Vision", "Python"],
    icon: Plane,
  },
  {
    id: 2,
    title: "Visual Clues Guided Indoor Drone",
    category: "Drones",
    description:
      "Drone capable of navigating indoor environments using visual markers.",
    technologies: ["Python", "ROS2", "Deep Learning"],
    icon: Cpu,
  },
  {
    id: 3,
    title: "Energy Efficient VTOL",
    category: "Space Tech",
    description:
      "Hybrid plane designed for longer endurance and efficient flight.",
    technologies: ["Embedded C", "PCB", "Data Analysis"],
    icon: Satellite,
  },
  {
    id: 4,
    title: "SAR: Search & Rescue Drone",
    category: "AI",
    description:
      "CNN-based drone system for human detection and GPS reporting.",
    technologies: ["TensorFlow", "PyTorch", "YOLO"],
    icon: Brain,
  },
  {
    id: 5,
    title: "Beach Garbage Detection Drone",
    category: "Drones",
    description:
      "Drone designed to detect and classify garbage in coastal regions.",
    technologies: ["PID", "IMU", "Telemetry"],
    icon: Plane,
  },
  {
    id: 6,
    title: "Budget Friendly ESP Drone",
    category: "Robotics",
    description:
      "Affordable WiFi-controlled drone built using ESP microcontrollers.",
    technologies: ["ROS", "SLAM", "Remote Control"],
    icon: Cpu,
  },
];

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects" className="py-16 md:py-24 bg-space-dark relative">
      <div className="container mx-auto px-4">

        {/* Heading */}
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4">
            Our Projects
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
            Innovative solutions pushing the boundaries of aerospace technology
          </p>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                size="sm"
                variant={selectedCategory === category ? "default" : "secondary"}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => {
            const Icon = project.icon;
            return (
              <div
                key={project.id}
                className="group p-5 rounded-xl bg-gradient-card border border-border/50 hover:border-primary/50 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                  <Icon className="h-6 w-6 text-primary" />
                </div>

                <Badge variant="secondary" className="mb-2 text-xs">
                  {project.category}
                </Badge>

                <h3 className="text-base md:text-lg font-bold mb-2">
                  {project.title}
                </h3>

                <p className="text-muted-foreground mb-3 text-xs md:text-sm">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-[10px] md:text-xs px-2 py-1 rounded-md bg-secondary/50"
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