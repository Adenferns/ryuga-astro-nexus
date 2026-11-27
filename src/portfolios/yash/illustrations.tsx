import type { CSSProperties } from "react";

/* Schematics for the Systems section. One grammar: hairline strokes, champagne accent over
   white/28, nothing but real component names as text. `still` (reduced motion) renders them static. */

const A = "hsl(var(--primary))";
const W = "rgb(255 255 255 / 0.3)";
const base = { fill: "none", strokeWidth: 1.1, strokeLinecap: "round", strokeLinejoin: "round" } as const;
type P = { still: boolean };
const delay = (s: number): CSSProperties => ({ animationDelay: `${s}s` });
const draw = (d: number): CSSProperties => ({ ["--len" as string]: 1, animationDelay: `${d}s` });

const Frame = ({ children }: { children: React.ReactNode }) => (
  <svg viewBox="0 0 400 300" className="h-full w-full" role="img" {...base}>
    {children}
  </svg>
);

/* 01 — visual-inertial odometry: a track, its uncertainty growing, features it keys on */
export const Vio = ({ still }: P) => {
  const path = "M40 252 C 120 236, 150 186, 214 172 S 322 112, 362 52";
  const pts: [number, number][] = [[70, 190], [112, 128], [168, 224], [190, 98], [248, 214], [262, 120], [318, 188], [330, 74], [96, 70], [228, 40], [292, 252]];
  return (
    <Frame>
      {[60, 120, 180, 240].map((y) => <path key={y} d={`M20 ${y}H380`} stroke={W} opacity="0.35" strokeDasharray="1 6" />)}
      {pts.map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="2.4" fill={W} stroke="none" className={still ? "" : "pf-pulse"} style={delay(i * 0.35)} />
          <path d={`M${x} ${y} l-9 5`} stroke={W} opacity="0.55" />
        </g>
      ))}
      {[[90, 246, 5, 3], [150, 208, 8, 5], [214, 172, 12, 7], [286, 142, 17, 10], [350, 72, 23, 13]].map(([x, y, rx, ry], i) => (
        <ellipse key={i} cx={x} cy={y} rx={rx} ry={ry} transform={`rotate(-28 ${x} ${y})`} stroke={A} opacity="0.35" />
      ))}
      <path d={path} stroke={A} pathLength={1} className={still ? "" : "pf-draw"} style={draw(0)} strokeWidth="1.6" />
      {!still && (
        <circle r="4.5" fill={A} stroke="none">
          <animateMotion dur="7s" repeatCount="indefinite" path={path} keyPoints="0;1;1" keyTimes="0;0.55;1" calcMode="linear" />
        </circle>
      )}
    </Frame>
  );
};

/* 02 — offline home: everything talks to a local hub; the cloud is struck through */
export const Home = ({ still }: P) => {
  const nodes = Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 3) * i - Math.PI / 2;
    return [200 + Math.cos(a) * 100, 158 + Math.sin(a) * 86] as const;
  });
  return (
    <Frame>
      {[0, 1].map((i) => <circle key={i} cx="200" cy="158" r="18" stroke={A} className={still ? "opacity-0" : "pf-ring"} style={delay(i * 1.6)} />)}
      {nodes.map(([x, y], i) => (
        <g key={i}>
          <path d={`M200 158 L${x} ${y}`} stroke={W} />
          <rect x={x - 11} y={y - 11} width="22" height="22" rx="6" stroke={W} />
          <circle cx={x} cy={y} r="2.6" fill={A} stroke="none" className={still ? "" : "pf-pulse"} style={delay(i * 0.5)} />
          {!still && (
            <circle r="2.2" fill={A} stroke="none" opacity="0">
              <animateMotion dur="3.2s" begin={`${i * 0.55}s`} repeatCount="indefinite" path={`M200 158 L${x} ${y}`} />
              <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.85;1" dur="3.2s" begin={`${i * 0.55}s`} repeatCount="indefinite" />
            </circle>
          )}
        </g>
      ))}
      <circle cx="200" cy="158" r="18" stroke={A} fill="hsl(var(--primary) / 0.1)" />
      <circle cx="200" cy="158" r="5" fill={A} stroke="none" />
      <g opacity="0.7">
        <path d="M322 64a13 13 0 0 1 3-25 19 19 0 0 1 36 4 12 12 0 0 1 1 21z" stroke={W} strokeDasharray="2 4" />
        <path d="M316 74 372 28" stroke={A} />
      </g>
    </Frame>
  );
};

/* 03 — many camera streams, detections appearing on a few of them */
export const Cams = ({ still }: P) => {
  const tiles = [26, 146, 266].flatMap((x) => [62, 168].map((y) => [x, y] as const));
  const boxes: Record<number, [number, number, number, number]> = { 0: [30, 18, 34, 28], 1: [58, 30, 28, 30], 3: [22, 24, 40, 24], 4: [48, 14, 30, 36] };
  return (
    <Frame>
      {tiles.map(([x, y], i) => (
        <g key={i}>
          <clipPath id={`cam${i}`}><rect x={x} y={y} width="108" height="78" rx="7" /></clipPath>
          <rect x={x} y={y} width="108" height="78" rx="7" stroke={W} />
          <g clipPath={`url(#cam${i})`}>
            <rect x={x} y={y} width="108" height="20" fill="rgb(255 255 255 / 0.07)" stroke="none" className={still ? "" : "pf-scan"} style={{ ...delay(i * 0.7), ["--h" as string]: "96px" }} />
            {boxes[i] && (
              <rect x={x + boxes[i][0]} y={y + boxes[i][1]} width={boxes[i][2]} height={boxes[i][3]} rx="2" stroke={A} className={still ? "" : "pf-blink"} style={delay(i * 0.9)} />
            )}
          </g>
          <circle cx={x + 10} cy={y + 10} r="2" fill={W} stroke="none" />
        </g>
      ))}
    </Frame>
  );
};

/* 04 — a board: traces draw themselves from the chip out to the pads */
export const Pcb = ({ still }: P) => {
  const traces = [
    "M160 130 H120 V84 H72", "M160 150 H96 V150 H72", "M160 170 H120 V214 H72", "M240 130 H280 V84 H328", "M240 150 H304 H328", "M240 170 H280 V214 H328",
    "M185 110 V76 H214", "M215 190 V226 H186",
  ];
  const pads: [number, number][] = [[72, 84], [72, 150], [72, 214], [328, 84], [328, 150], [328, 214], [214, 76], [186, 226]];
  return (
    <Frame>
      <rect x="36" y="34" width="328" height="232" rx="14" stroke={W} />
      {[[52, 50], [348, 50], [52, 250], [348, 250]].map(([x, y]) => <circle key={`${x}${y}`} cx={x} cy={y} r="4" stroke={W} />)}
      <rect x="160" y="110" width="80" height="80" rx="4" stroke={A} fill="hsl(var(--primary) / 0.06)" />
      <circle cx="172" cy="122" r="2.4" fill={A} stroke="none" />
      {[0, 1, 2, 3, 4].map((i) => (
        <path key={i} d={`M${176 + i * 12} 110v-6M${176 + i * 12} 190v6M160 ${126 + i * 12}h-6M240 ${126 + i * 12}h6`} stroke={W} />
      ))}
      {traces.map((d, i) => <path key={i} d={d} stroke={A} pathLength={1} className={still ? "" : "pf-draw"} style={draw(i * 0.25)} />)}
      {pads.map(([x, y], i) => <circle key={i} cx={x} cy={y} r="4.2" stroke={A} fill="#0b0f18" className={still ? "" : "pf-pulse"} style={delay(i * 0.3)} />)}
    </Frame>
  );
};

/* 05 — the whole path: sensors in, compute in the middle, control out */
export const Integration = ({ still }: P) => {
  const box = (x: number, y: number, label: string, hot = false) => (
    <g key={label}>
      <rect x={x - 46} y={y - 22} width="92" height="44" rx="9" stroke={hot ? A : W} fill={hot ? "hsl(var(--primary) / 0.08)" : "none"} />
      <text x={x} y={y + 3.5} textAnchor="middle" fontSize="9.5" letterSpacing="2" fill={hot ? A : "rgb(255 255 255 / 0.6)"} stroke="none" fontFamily="Instrument Sans, sans-serif">{label}</text>
    </g>
  );
  const links: [string, number][] = [
    ["M96 150 H154", 0], ["M246 150 H304", 0.8], ["M200 72 V128", 1.6], ["M200 172 V204 H116 V212", 2.2], ["M162 238 H238", 0.4],
  ];
  return (
    <Frame>
      {links.map(([d], i) => <path key={i} d={d} stroke={W} />)}
      {links.map(([d, t], i) =>
        still ? null : (
          <circle key={`p${i}`} r="2.6" fill={A} stroke="none" opacity="0">
            <animateMotion dur="3.4s" begin={`${t}s`} repeatCount="indefinite" path={d} />
            <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.85;1" dur="3.4s" begin={`${t}s`} repeatCount="indefinite" />
          </circle>
        ),
      )}
      {box(50, 150, "CAMERA")}
      {box(200, 150, "PI 5", true)}
      {box(350, 150, "PIXHAWK")}
      {box(200, 50, "PTZ")}
      {box(116, 238, "ESP32")}
      {box(284, 238, "RELAY")}
    </Frame>
  );
};
