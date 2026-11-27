import { Github, Linkedin, Mail } from "lucide-react";
import { Reveal, SectionHead } from "@/components/Reveal";
import YashPhoto from "../assets/Teamphotos/yash.jpeg";
import AdenPhoto from "../assets/Teamphotos/aden.jpeg";
import AlisterPhoto from "../assets/Teamphotos/alister.jpeg";
import SnidonPhoto from "../assets/Teamphotos/snidon.jpeg";

type Member = {
  name: string;
  role: string;
  bio: string;
  photo: string;
  github?: string;
  linkedin: string;
  email: string;
};

const aden: Member = {
  name: "Aden Fernandes",
  role: "Deep Learning & AI Engineer",
  bio: "Deep learning for computer vision and navigation",
  photo: AdenPhoto,
  github: "https://github.com/Adenferns",
  linkedin: "https://www.linkedin.com/in/adenfernandes6",
  email: "adenfernandes6@gmail.com",
};
const snidon: Member = {
  name: "Snidon Andrade",
  role: "Software Engineer",
  bio: "Full-stack development and system integration",
  photo: SnidonPhoto,
  github: "https://github.com/Snidon06",
  linkedin: "https://www.linkedin.com/in/snidon-andrade-90627a330",
  email: "snidonandrade06@gmail.com",
};
const yash: Member = {
  name: "Yash Shaw",
  role: "Aerospace & UAV Engineer",
  bio: "Expert in autonomous systems and sensor fusion",
  photo: YashPhoto,
  github: "https://github.com/INFINIX2004",
  linkedin: "https://www.linkedin.com/in/yash-shaw-607188250/",
  email: "yg.shaw2004@gmail.com",
};
const alister: Member = {
  name: "Alister Fernandes",
  role: "Robotics Lead",
  bio: "PCB design and embedded systems development",
  photo: AlisterPhoto,
  // GitHub omitted: the old link pointed at Yash's account. Add Alister's here.
  linkedin: "https://www.linkedin.com/in/alister-fernandes-4a7239317",
  email: "alisterbhp@gmail.com",
};

// The page is organised by where the crew ships, not by who they are.
const companies = [
  {
    name: "Endure Technologies",
    place: "Margao",
    note: "Expanding into robotics",
    members: [aden, snidon],
  },
  {
    name: "Savir Power and Automation Pvt Ltd",
    place: "Verna",
    note: "Power & automation",
    members: [yash],
  },
  {
    name: "Delga.ai",
    place: "San Francisco",
    note: "Y Combinator-backed",
    members: [alister],
  },
];

const iconLink =
  "inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-muted-foreground transition-[transform,color,border-color] duration-200 hover:border-primary/50 hover:text-foreground active:scale-[0.97]";

const MemberCard = ({ m }: { m: Member }) => (
  <article className="glass flex min-w-[17rem] flex-1 gap-4 rounded-3xl p-3">
    <img
      src={m.photo}
      alt={m.name}
      loading="lazy"
      decoding="async"
      className="aspect-[4/5] w-28 shrink-0 rounded-2xl object-cover object-top sm:w-32"
    />
    <div className="flex min-w-0 flex-1 flex-col py-1 pr-1">
      <h3 className="font-display text-2xl leading-tight">{m.name}</h3>
      <p className="label mt-2">{m.role}</p>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{m.bio}</p>
      <div className="mt-auto flex gap-1.5 pt-3">
        {m.github && (
          <a
            href={m.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${m.name} on GitHub`}
            className={iconLink}
          >
            <Github className="h-4 w-4" />
          </a>
        )}
        <a
          href={m.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${m.name} on LinkedIn`}
          className={iconLink}
        >
          <Linkedin className="h-4 w-4" />
        </a>
        <a href={`mailto:${m.email}`} aria-label={`Email ${m.name}`} className={iconLink}>
          <Mail className="h-4 w-4" />
        </a>
      </div>
    </div>
  </article>
);

const Team = () => (
  <section id="team" className="scroll-mt-24 py-28 md:py-44">
    <div className="container">
      <SectionHead
        index="02"
        label="Crew"
        title={
          <>
            Four engineers. Three companies. <em className="text-primary">One team.</em>
          </>
        }
      />

      <div className="border-t border-white/10">
        {companies.map((c) => (
          <Reveal key={c.name}>
            <div className="grid gap-8 border-b border-white/10 py-12 lg:grid-cols-12 lg:gap-12 lg:py-16">
              <div className="lg:col-span-5">
                <p className="label mb-5 text-primary">Now at</p>
                <h3 className="font-display text-5xl leading-[1.02] tracking-[-0.02em] md:text-6xl">
                  {c.name}
                </h3>
                <p className="label mt-5">
                  {c.place}
                  {c.note && <span className="text-foreground"> · {c.note}</span>}
                </p>
              </div>
              <div className="flex flex-wrap gap-4 lg:col-span-7">
                {c.members.map((m) => (
                  <MemberCard key={m.name} m={m} />
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default Team;
