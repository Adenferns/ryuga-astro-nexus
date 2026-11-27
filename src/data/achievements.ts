import img2 from "@/assets/Gallery/img2.jpeg";
import img23 from "@/assets/Gallery/img23.jpeg";
import img29 from "@/assets/Gallery/img29.jpeg";

export type Achievement = {
  date: string;
  title: string;
  description: string;
  image?: string;
  alt?: string;
};

// Dates are kept exactly as originally written; several look off (e.g. a 2026 event dated 2025). Verify.
export const achievements: Achievement[] = [
  {
    date: "February 28th, 2025",
    title: "Won Ideas 2026 Most Innovative Project Award",
    description:
      "Won the 'Most Innovative Project' award at Ideas 2026 for our project on autonomous drone development.",
    image: img2,
    alt: "The team with their drones at the Ideas exhibition",
  },
  {
    // Date taken from the Converge 3.0 stage banner in the photo (30th January 2026).
    date: "January 30th, 2026",
    title: "Young Innovators Challenge (Prototype Runners Up)",
    description:
      "Second Place for their prototype 'Aerovision' in the Young Innovators Challenge at Converge 3.0.",
    image: img29,
    alt: "Prize ceremony at Converge 3.0",
  },
  {
    date: "February 13th, 2025",
    title: "Drone Workshop For Agnel Students",
    description:
      "Successfully conducted a workshop for Agnel students on drone programming and development.",
    image: img23,
    alt: "Drone workshop presentation in a school hall",
  },
  {
    date: "December 17th, 2025",
    title: "Goa Government’s Campus Innovation Scheme",
    description:
      "Under Goa Startup Policy 2025, provides up to ₹50,000 reimbursement for student projects.",
  },
  {
    date: "November 15th, 2025",
    title: "Techgium Finalist",
    description: "Reached the final round of Techgium 2026.",
  },
  {
    date: "September 25th, 2025",
    title: "Goa Innovation Challenge",
    description:
      "Secured top 30 rank teams in Goa Innovation Challenge organised by Department of IT.",
  },
  {
    date: "August 7th, 2025",
    title: "Working Under Center For Drone Application (CDA) @ IIT Goa",
    description: "Developing and researching VIO, VSLAM, ROS and other algorithms in drones.",
  },
];
