import { useEffect, useRef } from "react";
import { MotionConfig } from "motion/react";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import Work from "./pages/Work";
import Crew from "./pages/Crew";
import CrewMember from "./pages/CrewMember";
import GalleryPage from "./pages/GalleryPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Router doesn't scroll on navigation by itself: jump to the #hash target, or to the top on a new page.
const ScrollManager = () => {
  const { pathname, hash, key } = useLocation();
  const prevPath = useRef(pathname);
  useEffect(() => {
    const samePage = prevPath.current === pathname;
    prevPath.current = pathname;
    const behavior = samePage ? "smooth" : "instant";
    const target = hash ? document.getElementById(hash.slice(1)) : null;
    if (target) target.scrollIntoView({ behavior });
    else window.scrollTo({ top: 0, behavior });
  }, [pathname, hash, key]);
  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <MotionConfig reducedMotion="user">
      <TooltipProvider>
        <Sonner />
        <BrowserRouter>
          <ScrollManager />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/work" element={<Work />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/crew" element={<Crew />} />
            <Route path="/crew/:slug" element={<CrewMember />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </MotionConfig>
  </QueryClientProvider>
);

export default App;
