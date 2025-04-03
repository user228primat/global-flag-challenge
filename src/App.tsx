
import { useEffect, useState } from "react";
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
import YandexGamesSDK from "./services/YandexGamesSDK";
import { toast } from "./components/ui/use-toast";

const queryClient = new QueryClient();

// Компонент загрузки, который отображается до инициализации приложения
const LoadingScreen = () => (
  <div className="fixed inset-0 bg-gradient-deep flex flex-col items-center justify-center">
    <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
    <h2 className="text-2xl font-bold text-white mb-2">Загрузка...</h2>
    <p className="text-white/70">Инициализация Global Flag Challenge</p>
  </div>
);

const App = () => {
  const [sdkInitialized, setSdkInitialized] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Инициализация Yandex SDK при загрузке приложения
  useEffect(() => {
    const initializeSDK = async () => {
      try {
        console.log("Initializing Yandex Games SDK...");
        const sdk = YandexGamesSDK.getInstance();
        const initialized = await sdk.init();
        setSdkInitialized(initialized);
        
        if (initialized) {
          console.log("Yandex Games SDK initialized successfully");
        } else {
          console.warn("Failed to initialize Yandex Games SDK", sdk.getInitError());
          // Показываем уведомление только в dev режиме
          if (import.meta.env.DEV) {
            toast({
              title: "Предупреждение",
              description: `SDK Яндекс.Игр не инициализирован: ${sdk.getInitError() || 'неизвестная ошибка'}`,
              variant: "destructive",
            });
          }
        }

        // Независимо от результата инициализации SDK, после таймаута показываем приложение
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error initializing SDK:", error);
        setSdkInitialized(false);
        setLoading(false);
      }
    };

    initializeSDK();
  }, []);

  // Показываем экран загрузки, пока SDK инициализируется
  if (loading) {
    return <LoadingScreen />;
  }

  return (
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
};

export default App;
