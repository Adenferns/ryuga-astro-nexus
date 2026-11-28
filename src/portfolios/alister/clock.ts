import { useEffect, useState } from "react";

const fmt = new Intl.DateTimeFormat("en-US", { timeZone: "America/Los_Angeles", hour: "2-digit", minute: "2-digit", hour12: false });

/** Current San Francisco time as "HH:MM". Ticks every 15 s, which is plenty for minutes. */
export const useSfTime = () => {
  const [t, setT] = useState(() => fmt.format(new Date()));
  useEffect(() => {
    const id = setInterval(() => setT(fmt.format(new Date())), 15000);
    return () => clearInterval(id);
  }, []);
  return t;
};
