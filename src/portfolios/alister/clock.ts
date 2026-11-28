import { useEffect, useState } from "react";

const zones = {
  india: new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit", hour12: false }),
  sf: new Intl.DateTimeFormat("en-GB", { timeZone: "America/Los_Angeles", hour: "2-digit", minute: "2-digit", hour12: false }),
};

/** Current time in India (IST) and in San Francisco, as "HH:MM". Ticks every 15 s, plenty for minutes. */
export const useClocks = () => {
  const read = () => ({ india: zones.india.format(new Date()), sf: zones.sf.format(new Date()) });
  const [t, setT] = useState(read);
  useEffect(() => {
    const id = setInterval(() => setT(read()), 15000);
    return () => clearInterval(id);
  }, []);
  return t;
};
