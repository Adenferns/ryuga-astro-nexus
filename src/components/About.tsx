import { Eyebrow, Reveal } from "@/components/Reveal";

const About = () => (
  <section id="about" className="scroll-mt-24 py-28 md:py-44">
    <div className="container">
      <Reveal>
        <Eyebrow index="i" label="Mission" />
        <p className="max-w-5xl font-display text-4xl font-normal leading-[1.08] tracking-[-0.02em] md:text-7xl">
          A student-led team turning hands-on experience into real aerospace systems.{" "}
          <span className="text-muted-foreground">
            Drones, robotics, AI and space tech — built by students who now ship inside industry.
          </span>
        </p>
      </Reveal>

      <div className="mt-16 grid gap-5 md:mt-28 md:grid-cols-2">
        <Reveal>
          <div className="glass h-full rounded-3xl p-8 md:p-10">
            <h3 className="label mb-6 text-primary">Our mission</h3>
            <p className="text-lg leading-relaxed">
              To empower students with hands-on experience in cutting-edge aerospace technologies,
              fostering innovation and technical excellence in drone systems, robotics, and space
              exploration.
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="glass h-full rounded-3xl p-8 md:p-10">
            <h3 className="label mb-6 text-primary">Our vision</h3>
            <p className="text-lg leading-relaxed">
              To become a leading student organization recognized globally for groundbreaking
              aerospace innovations and contributing to the advancement of space technology and
              autonomous systems.
            </p>
          </div>
        </Reveal>
      </div>
    </div>
  </section>
);

export default About;
