import YashPhoto from "../assets/Teamphotos/yash.jpeg";
import AdenPhoto from "../assets/Teamphotos/aden.jpeg";
import AlisterPhoto from "../assets/Teamphotos/alister.jpeg";
import SnidonPhoto from "../assets/Teamphotos/snidon.jpeg";

export type Person = {
  slug: string;
  name: string;
  role: string;
  bio: string;
  photo: string;
  company: string;
  place: string;
  note?: string;
  github?: string;
  linkedin: string;
  email: string;
  /** true once src/portfolios/<slug>/ exists and is registered in pages/CrewMember.tsx */
  portfolio: boolean;
};

export const people: Person[] = [
  {
    slug: "aden",
    name: "Aden Fernandes",
    role: "Deep Learning & AI Engineer",
    bio: "Deep learning for computer vision and navigation",
    photo: AdenPhoto,
    company: "Endure Technologies",
    place: "Margao",
    note: "Expanding into robotics",
    github: "https://github.com/Adenferns",
    linkedin: "https://www.linkedin.com/in/adenfernandes6",
    email: "adenfernandes6@gmail.com",
    portfolio: false,
  },
  {
    slug: "snidon",
    name: "Snidon Andrade",
    role: "Software Engineer",
    bio: "Full-stack development and system integration",
    photo: SnidonPhoto,
    company: "Endure Technologies",
    place: "Margao",
    note: "Expanding into robotics",
    github: "https://github.com/Snidon06",
    linkedin: "https://www.linkedin.com/in/snidon-andrade-90627a330",
    email: "snidonandrade06@gmail.com",
    portfolio: false,
  },
  {
    slug: "yash",
    name: "Yash Shaw",
    role: "Aerospace & UAV Engineer",
    bio: "Expert in autonomous systems and sensor fusion",
    photo: YashPhoto,
    company: "Savir Power and Automation Pvt Ltd",
    place: "Verna",
    note: "Power & automation",
    github: "https://github.com/YashShawDevs",
    linkedin: "https://www.linkedin.com/in/yash-shaw-607188250/",
    email: "yg.shaw2004@gmail.com",
    portfolio: true,
  },
  {
    slug: "alister",
    name: "Alister Fernandes",
    role: "Robotics Lead",
    bio: "PCB design and embedded systems development",
    photo: AlisterPhoto,
    company: "Delga.ai",
    place: "San Francisco",
    note: "Y Combinator-backed",
    // GitHub omitted: the old link pointed at a non-existent account. Add Alister's here.
    linkedin: "https://www.linkedin.com/in/alister-fernandes-4a7239317",
    email: "alisterbhp@gmail.com",
    portfolio: true,
  },
];

export const person = (slug: string) => people.find((p) => p.slug === slug);
