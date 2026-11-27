import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const { pathname } = useLocation();
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <p className="label mb-6">404 — {pathname}</p>
      <h1 className="font-display text-6xl leading-[1] tracking-[-0.03em] md:text-9xl">
        Off <em className="text-primary">course.</em>
      </h1>
      <p className="mt-6 max-w-sm text-muted-foreground">That page doesn&apos;t exist, or it has moved.</p>
      <Button asChild size="lg" className="mt-10 h-12 px-8">
        <Link to="/">Back to Ryuga</Link>
      </Button>
    </main>
  );
};

export default NotFound;
