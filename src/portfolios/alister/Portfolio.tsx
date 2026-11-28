import { useEffect } from "react";
import { PortfolioNav } from "../PortfolioNav";
import { Hero } from "./Hero";
import { Intro } from "./Intro";
import { Chapters } from "./Chapters";
import { Contact } from "./Closing";

const links = [{ href: "#chapters", label: "Path" }];

const Portfolio = () => {
  useEffect(() => {
    const prev = document.title;
    document.title = "Alister Fernandes — Portfolio · Ryuga Aerospace";
    return () => {
      document.title = prev;
    };
  }, []);
  return (
    <>
      <PortfolioNav name="Alister Fernandes" links={links} />
      <main>
        <Hero />
        <Intro />
        <Chapters />
        <Contact />
      </main>
    </>
  );
};

export default Portfolio;
