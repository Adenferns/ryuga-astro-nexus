import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Cpu, Plane, Satellite, Brain } from "lucide-react";

const categories = ["All", "Drones", "Robotics", "AI", "Space Tech"];

const projects = [
  {
    id: 1,
    title: "Autonomous Delivery Drone",
    category: "Drones",
    description: "AI-powered drone system for autonomous package delivery with obstacle avoidance and real-time path planning.",
    technologies: ["ROS", "Computer Vision", "Python", "GPS Navigation"],
    icon: Plane,
  },
  {
    id: 2,
    title: "Swarm Robotics System",
    category: "Robotics",
    description: "Coordinated multi-robot system capable of collaborative task execution and decentralized decision making.",
    technologies: ["C++", "Multi-Agent Systems", "ROS2", "Sensor Fusion"],
    icon: Cpu,
  },
  {
    id: 3,
    title: "CubeSat Development",
    category: "Space Tech",
    description: "Small satellite platform for atmospheric research and remote sensing applications in low Earth orbit.",
    technologies: ["Embedded C", "Radio Communications", "Solar Power", "Data Analysis"],
    icon: Satellite,
  },
  {
    id: 4,
    title: "AI Vision System",
    category: "AI",
    description: "Deep learning-based object detection and tracking system for autonomous aerial vehicles.",
    technologies: ["TensorFlow", "PyTorch", "OpenCV", "YOLO"],
    icon: Brain,
  },
  {
    id: 5,
    title: "Fixed-Wing Racing Drone",
    category: "Drones",
    description: "High-speed autonomous racing drone with advanced flight control and telemetry systems.",
    technologies: ["PID Control", "IMU Sensors", "Telemetry", "Flight Controller"],
    icon: Plane,
  },
  {
    id: 6,
    title: "Mars Rover Prototype",
    category: "Robotics",
    description: "All-terrain autonomous rover designed for planetary exploration with sample collection capabilities.",
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
