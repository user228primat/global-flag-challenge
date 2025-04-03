
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import { GameProvider } from "./contexts/GameContext";
import Index from "./pages/Index";
import Game from "./pages/Game";
import Reference from "./pages/Reference";
import CategoryPage from "./pages/CategoryPage";
import Capitals from "./pages/Capitals";
import CapitalsOptions from "./pages/CapitalsOptions";
import CapitalsGame from "./pages/CapitalsGame";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <GameProvider>
        <Toaster />
        <Sonner />
        <HashRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/game" element={<Game />} />
            <Route path="/reference" element={<Reference />} />
            <Route path="/category/:categoryId" element={<CategoryPage />} />
            <Route path="/capitals" element={<Capitals />} />
            <Route path="/capitals/:regionId" element={<CapitalsOptions />} />
            <Route path="/capitals/game" element={<CapitalsGame />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </HashRouter>
      </GameProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
