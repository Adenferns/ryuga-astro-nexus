import img7 from "@/assets/Gallery/img7.jpeg";
import img9 from "@/assets/Gallery/img9.jpeg";
import img10 from "@/assets/Gallery/img10.jpeg";
import img11 from "@/assets/Gallery/img11.jpeg";
import img14 from "@/assets/Gallery/img14.jpeg";
import img22 from "@/assets/Gallery/img22.jpeg";

export type Project = {
  slug: string;
  title: string;
  category: string;
  description: string;
  overview: string;
  highlights: string[];
  stack: { name: string; role: string }[];
  image: string;
  alt: string;
};

// Single source for the home-page index and the /work showcase.
// `overview`, `highlights` and `stack[].role` are DRAFTED from each project's one-line description and
// tech list (what the problem is and what each tool is for). They contain no results or metrics —
// check them against what was actually built and add real numbers where you have them.
// Photos are matched by what they show; swap `image` for a better shot any time.
export const projects: Project[] = [
  {
    slug: "gps-denied-drone",
    title: "GPS-Denied Drone",
    category: "Drones",
    description:
      "AI-powered drone system for autonomous navigation in GPS-denied environments with obstacle avoidance.",
    overview:
      "Satellite navigation fails indoors, under cover and in built-up areas. This drone is built to keep flying anyway: it works out where it is and what is around it from what it can see and sense, and steers clear of obstacles without waiting for a GPS fix.",
    highlights: [
      "Navigates autonomously with no GPS fix",
      "Avoids obstacles it senses along the way",
      "Modular ROS software, so sensing and control can be developed and swapped independently",
    ],
    stack: [
      { name: "ROS", role: "Structures the flight software as independent nodes for sensing, estimation and control." },
      { name: "Computer Vision", role: "Turns camera frames into the cues the drone navigates and avoids obstacles by." },
      { name: "Python", role: "Prototyping language for the perception and mission logic." },
    ],
    image: img10,
    alt: "Quadcopter fitted with ultrasonic obstacle-avoidance sensors",
  },
  {
    slug: "indoor-visual-drone",
    title: "Visual Clues Guided Indoor Drone",
    category: "Drones",
    description: "Drone capable of navigating indoor environments using visual markers.",
    overview:
      "Indoors there is no GPS and very little room for error. This drone finds its way by recognising visual markers placed in the environment and using them as waypoints through a space.",
    highlights: [
      "Navigates by recognising visual markers",
      "Flies indoors, where GPS is unavailable",
      "Deep learning in the perception pipeline to pick markers out reliably",
    ],
    stack: [
      { name: "Python", role: "Perception and mission logic." },
      { name: "ROS2", role: "Message passing and node lifecycle across the vehicle's software." },
      { name: "Deep Learning", role: "Learned models that pick out the visual markers from camera images." },
    ],
    image: img11,
    alt: "Team flying a small drone indoors in a lab",
  },
  {
    slug: "energy-efficient-vtol",
    title: "Energy Efficient VTOL",
    category: "Space Tech",
    description: "Hybrid plane designed for longer endurance and efficient flight.",
    overview:
      "A hybrid aircraft that takes off and lands vertically like a multirotor, then cruises on a wing — trading some hover simplicity for far better endurance. The work is about spending every watt-hour well: efficient flight, purpose-built electronics, and data to show where the energy goes.",
    highlights: [
      "Vertical take-off and landing with wing-borne cruise",
      "Designed for longer endurance than a pure multirotor",
      "Custom electronics and flight-data analysis to find efficiency gains",
    ],
    stack: [
      { name: "Embedded C", role: "Firmware for the flight and power electronics." },
      { name: "PCB", role: "Custom board design for the vehicle's electronics." },
      { name: "Data Analysis", role: "Flight logs analysed to see where the energy goes." },
    ],
    image: img22,
    alt: "Team standing beside the VTOL airframe at an exhibition table",
  },
  {
    slug: "search-and-rescue-drone",
    title: "SAR: Search & Rescue Drone",
    category: "AI",
    description: "CNN-based drone system for human detection and GPS reporting.",
    overview:
      "In search and rescue, covering ground quickly matters. This drone watches the scene through a camera, uses a convolutional neural network to spot people, and reports their GPS position so responders know where to go.",
    highlights: [
      "Detects people from the air with a CNN",
      "Reports the GPS position of each detection",
      "Real-time detection suited to fast sweeps of an area",
    ],
    stack: [
      { name: "TensorFlow", role: "Training and deploying detection models." },
      { name: "PyTorch", role: "Prototyping and fine-tuning models." },
      { name: "YOLO", role: "Real-time object-detection architecture used to find people in frames." },
    ],
    image: img14,
    alt: "Quadcopter with a red camera payload being adjusted by hand",
  },
  {
    slug: "beach-garbage-detection-drone",
    title: "Beach Garbage Detection Drone",
    category: "Drones",
    description: "Drone designed to detect and classify garbage in coastal regions.",
    overview:
      "Coastal litter is slow to survey on foot. This drone flies the shoreline, detects garbage and classifies what it finds, giving a clearer picture of where clean-up effort is needed.",
    highlights: [
      "Detects garbage along coastal stretches",
      "Classifies the kind of waste it sees",
      "Stable, telemetry-monitored flight over open coast",
    ],
    stack: [
      { name: "PID", role: "Control loops that keep the drone stable and on course." },
      { name: "IMU", role: "Inertial sensing of attitude and motion for stabilisation." },
      { name: "Telemetry", role: "Live link streaming flight state back to the ground station." },
    ],
    image: img7,
    alt: "Team presenting the beach garbage detection solution",
  },
  {
    slug: "budget-esp-drone",
    title: "Budget Friendly ESP Drone",
    category: "Robotics",
    description: "Affordable WiFi-controlled drone built using ESP microcontrollers.",
    overview:
      "Drones don't have to be expensive to be useful. This one is built around low-cost ESP microcontrollers and controlled over WiFi, aimed at making hands-on flight and robotics work affordable.",
    highlights: [
      "Controlled wirelessly over WiFi",
      "Built on affordable ESP microcontrollers",
      "Software hooks for ROS and SLAM experiments",
    ],
    stack: [
      { name: "ROS", role: "Software framework for commanding the drone and recording data." },
      { name: "SLAM", role: "Mapping and localisation experiments." },
      { name: "Remote Control", role: "Manual control link over WiFi." },
    ],
    image: img9,
    alt: "Small quadcopters and a radio transmitter on grass",
  },
];
