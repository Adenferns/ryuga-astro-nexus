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
  /** Aerospace = flying, sensing and ground systems; Software = platforms, data and AI. */
  domain: "Aerospace" | "Software";
  /** Who built it, where it is known. */
  by?: string;
  description: string;
  overview: string;
  highlights: string[];
  stack: { name: string; role: string }[];
  /** Software projects have no photo; the showcase draws a typographic cover instead. */
  image?: string;
  alt?: string;
};

// Single source for the home-page index and the /work showcase.
// The six aerospace entries' `overview`, `highlights` and `stack[].role` are DRAFTED from their one-line
// descriptions. The eight added below are written from each repository's README (what it does and the
// tools it uses). No results or metrics anywhere — add real ones when you have them.
// Photos are matched by what they show; swap `image` for a better shot any time.
const flight: Project[] = [
  {
    slug: "gps-denied-drone",
    title: "GPS-Denied Drone",
    category: "Drones",
    domain: "Aerospace",
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
    domain: "Aerospace",
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
    domain: "Aerospace",
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
    domain: "Aerospace",
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
    domain: "Aerospace",
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
    domain: "Aerospace",
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

const built: Project[] = [
  {
    slug: "agrivision",
    title: "AgriVision",
    category: "Precision agriculture",
    domain: "Aerospace",
    by: "Yash",
    description: "Drone-based precision agriculture: AI mission planning, weed detection and GPS spray mapping.",
    overview:
      "A drone that plans its own work and sees what a farmer would miss. An AI planner turns a request into a mission, the onboard camera finds weeds, and every detection is projected onto real GPS coordinates, so spraying can be targeted at the plants that need it instead of the whole field.",
    highlights: [
      "Mission planning from a plain request, generated by an LLM",
      "Weed detection with a trained YOLOv8 model, projected to GPS positions",
      "Deploy, abort and return-to-home controls reaching the drone’s Raspberry Pi",
      "One backend serving a web dashboard and an Android app",
    ],
    stack: [
      { name: "YOLOv8", role: "Detects weeds in each frame; detections are then mapped to ground coordinates." },
      { name: "Gemini", role: "Generates the flight mission from a natural-language request." },
      { name: "FastAPI", role: "Single backend for detection, missions, telemetry and drone control." },
      { name: "React + Expo", role: "A web dashboard and a React Native Android app over the same API." },
      { name: "Raspberry Pi", role: "Runs on the drone; missions are deployed and aborted over SSH." },
    ],
  },
  {
    slug: "logforge",
    title: "LogForge",
    category: "Distributed systems",
    domain: "Software",
    by: "Yash",
    description: "A distributed log pipeline that learns what normal looks like and flags what isn’t.",
    overview:
      "Logs from many services arrive over HTTP, are buffered so nothing is lost, processed in batches into a columnar database, and watched by a per-service anomaly model. It is a complete ingest-to-insight pipeline, with dashboards on top and the whole stack runnable with one command or on Kubernetes.",
    highlights: [
      "Async ingestion buffered through Redis Streams with persistence",
      "Batch processing into ClickHouse with a 30-day retention window",
      "Unsupervised anomaly detection, with separate seasonal models per service",
      "Grafana dashboards; runs on Docker Compose or Kubernetes",
    ],
    stack: [
      { name: "FastAPI", role: "Collector that validates and ingests logs, and the API that queries them." },
      { name: "Redis Streams", role: "Durable buffer between ingestion and processing." },
      { name: "ClickHouse", role: "Columnar store for fast analytics over large log volumes." },
      { name: "scikit-learn", role: "Isolation Forest models that surface anomalies per service." },
      { name: "Grafana", role: "Dashboards over logs, statistics and anomalies." },
      { name: "Docker + Kubernetes", role: "One-command local run, and a Kind-based cluster deployment." },
    ],
  },
  {
    slug: "aerovision-dashboard",
    title: "AeroVision Ground Dashboard",
    category: "Surveillance dashboard",
    domain: "Aerospace",
    by: "Yash",
    description: "Real-time telemetry and threat dashboard for a GPS-denied surveillance drone.",
    overview:
      "The operator’s view of the drone. Live system health, a ranked list of detected threats, multi-horizon trajectory predictions with confidence scores and a severity-graded alert timeline, all streamed in real time and built to keep working when the connection doesn’t.",
    highlights: [
      "Live battery, power, frame rate and camera status",
      "Threat list with predicted trajectories at near, medium and far horizons",
      "Video from webcam, RTSP, MJPEG or WebRTC sources",
      "WebSocket streaming that falls back to polling with exponential backoff",
    ],
    stack: [
      { name: "React + TypeScript", role: "Typed UI with runtime validation of incoming telemetry." },
      { name: "WebSocket", role: "Primary live stream, with HTTP polling as automatic failover." },
      { name: "WebRTC / RTSP", role: "Flexible video feed options for different camera setups." },
      { name: "Property-based tests", role: "Checks the state and data handling against generated inputs, not just fixed examples." },
    ],
  },
  {
    slug: "flowlens",
    title: "FlowLens",
    category: "Engineering analytics SaaS",
    domain: "Software",
    by: "Yash",
    description: "A multi-tenant platform that turns GitHub activity into DORA metrics and AI retrospectives.",
    overview:
      "Connect a GitHub account and FlowLens syncs repositories, pull requests and deployments into an isolated workspace, then shows how a team actually ships: the four DORA metrics, pull-request cycle times, per-developer load, repository health, and retrospectives written by an AI.",
    highlights: [
      "DORA metrics with industry benchmarks, plus PR cycle-time breakdowns",
      "Per-developer and per-repository analytics in isolated tenant workspaces",
      "AI retrospectives through a provider fallback chain across three model vendors",
      "Background sync workers, PDF reports and Slack notifications",
    ],
    stack: [
      { name: "Next.js + React", role: "App Router front end and server layer for the product." },
      { name: "PostgreSQL + Prisma", role: "Serverless Postgres with a typed ORM for multi-tenant data." },
      { name: "BullMQ + Redis", role: "Queue and a separate worker process for GitHub sync jobs." },
      { name: "Clerk", role: "Authentication and user management." },
      { name: "Sentry", role: "Error tracking and performance monitoring." },
    ],
  },
  {
    slug: "ecg-classifier",
    title: "ECG Cardiac Classifier",
    category: "Applied machine learning",
    domain: "Software",
    by: "Aden",
    description: "A deep-learning model that reads an ECG image alongside patient data to flag cardiac conditions.",
    overview:
      "Upload an ECG and enter a few patient details, and the model returns probabilities across five diagnostic classes. A two-branch network reads the trace as an image and the patient data as numbers, then fuses them for the final call.",
    highlights: [
      "Multi-input network: image branch and patient-data branch fused together",
      "Five classes: normal, myocardial infarction, ST/T change, conduction disturbance, hypertrophy",
      "Shows the full probability spread, not just a single label",
      "Served as a web app anyone can open and use",
    ],
    stack: [
      { name: "TensorFlow / Keras", role: "Builds and trains the two-branch classifier." },
      { name: "MobileNetV2", role: "Backbone of the image branch that reads the ECG trace." },
      { name: "OpenCV", role: "Prepares uploaded images for the model." },
      { name: "Gradio", role: "The upload-and-predict interface." },
    ],
  },
  {
    slug: "devforge",
    title: "DevForge",
    category: "Developer tooling",
    domain: "Software",
    by: "Yash",
    description: "Paste an API’s documentation URL and get a production-ready wrapper class back.",
    overview:
      "Integrating an API usually starts with hours of reading docs. DevForge reads them for you: it crawls the documentation, pulls out the endpoints, authentication and parameters, and writes a wrapper class in Python or JavaScript tailored to the use case.",
    highlights: [
      "Recursively follows relevant documentation pages",
      "LLM-based extraction of endpoints, auth methods and parameters",
      "Generates a ready-to-use wrapper in Python or JavaScript",
      "Runs with one Docker command",
    ],
    stack: [
      { name: "FastAPI", role: "Backend with separate scrape, extract and generate stages." },
      { name: "BeautifulSoup", role: "Crawls and cleans the documentation pages." },
      { name: "Gemini", role: "Extracts structured API details and generates the code." },
      { name: "React + Vite", role: "Front end for submitting a URL and reviewing the result." },
    ],
  },
  {
    slug: "control-station",
    title: "Ground Control Station",
    category: "Ground systems",
    domain: "Aerospace",
    by: "Snidon",
    description: "A drone ground-control application in C#, taken over, diagnosed and brought back to stable.",
    overview:
      "An open-source ground-control codebase that no longer ran, originally written by Joop Brokking. Snidon took it over, worked out what was broken, fixed it, and restored it to a stable, buildable application the team can fly with.",
    highlights: [
      "Diagnosed why the inherited codebase failed to run or meet its goals",
      "Restored it to a stable, buildable state",
      "Published both the source and a ready-to-use build",
    ],
    stack: [
      { name: "C# / .NET", role: "The desktop ground-control application itself." },
      { name: "Debugging", role: "Tracing the original faults down to the code that caused them." },
    ],
  },
  {
    slug: "smart-shopper",
    title: "Smart Shopper",
    category: "Full-stack web app",
    domain: "Software",
    by: "Snidon",
    description: "Tracks product prices, alerts you to drops and predicts where they’re heading.",
    overview:
      "Search a product, watch its price history on a chart, compare options side by side, and get an email when the price falls. A prediction model estimates where the price goes next, and an admin dashboard keeps the whole thing configurable.",
    highlights: [
      "Product search through Google Shopping results",
      "Price-history charts with AI-based price prediction",
      "Email alerts on price drops",
      "Side-by-side comparison in a dark UI, plus an admin dashboard",
    ],
    stack: [
      { name: "Flask", role: "Web application and admin dashboard." },
      { name: "SerpAPI", role: "Source of live Google Shopping product data." },
      { name: "NumPy", role: "Numerical work behind the price predictions." },
      { name: "BeautifulSoup", role: "Parses product pages." },
    ],
  },
];

// Interleaved on purpose, so the showcase reads as one team that flies things and ships software.
const order = [
  "gps-denied-drone",
  "agrivision",
  "logforge",
  "indoor-visual-drone",
  "flowlens",
  "aerovision-dashboard",
  "ecg-classifier",
  "energy-efficient-vtol",
  "devforge",
  "search-and-rescue-drone",
  "control-station",
  "smart-shopper",
  "beach-garbage-detection-drone",
  "budget-esp-drone",
];
const all = [...flight, ...built];
export const projects: Project[] = order.map((slug) => {
  const p = all.find((x) => x.slug === slug);
  if (!p) throw new Error(`projects: unknown slug ${slug}`);
  return p;
});

/** Distinct tools named across every project: a real count, so it grows as projects are added. */
export const techCount = new Set(projects.flatMap((p) => p.stack.map((t) => t.name))).size;
