const tech = [
  "ROS 2",
  "Computer Vision",
  "VSLAM",
  "VIO",
  "YOLO",
  "PyTorch",
  "TensorFlow",
  "Embedded C",
  "PCB design",
  "PID control",
  "IMU",
  "Telemetry",
  "FastAPI",
  "React",
  "Kubernetes",
  "ClickHouse",
  "Next.js",
];

const Row = ({ hidden }: { hidden?: boolean }) => (
  <ul aria-hidden={hidden} className="flex shrink-0 items-center">
    {tech.map((t) => (
      <li
        key={t}
        className="flex items-center whitespace-nowrap font-display text-3xl italic text-muted-foreground"
      >
        {t}
        <span aria-hidden className="mx-8 text-xl not-italic text-primary">
          ✦
        </span>
      </li>
    ))}
  </ul>
);

const Marquee = () => (
  <div
    aria-label="Technologies we work with"
    className="overflow-hidden border-y border-white/10 py-6 [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]"
  >
    <div className="flex w-max animate-marquee hover:[animation-play-state:paused] motion-reduce:animate-none">
      <Row />
      <Row hidden />
    </div>
  </div>
);

export default Marquee;
