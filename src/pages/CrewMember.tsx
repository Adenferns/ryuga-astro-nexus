import { lazy, Suspense, type ComponentType } from "react";
import { Navigate, useParams } from "react-router-dom";
import { person } from "@/data/people";

// One lazy chunk per portfolio. To add yours: build src/portfolios/<slug>/Portfolio.tsx,
// register it here, and set `portfolio: true` for that person in src/data/people.ts.
const portfolios: Record<string, ComponentType> = {
  yash: lazy(() => import("@/portfolios/yash/Portfolio")),
  alister: lazy(() => import("@/portfolios/alister/Portfolio")),
};

const Loading = () => (
  <div className="flex min-h-screen items-center justify-center">
    <span className="font-display text-3xl italic text-muted-foreground">Loading…</span>
  </div>
);

const CrewMember = () => {
  const { slug = "" } = useParams();
  const Page = portfolios[slug];
  if (!person(slug) || !Page) return <Navigate to="/crew" replace />;
  return (
    <Suspense fallback={<Loading />}>
      <Page />
    </Suspense>
  );
};

export default CrewMember;
