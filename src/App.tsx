
import { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
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

// Component for auto-redirecting from problematic paths
const RedirectHandler = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Handle special cases for Yandex Games URLs
    if (location.pathname.includes('origin=') || 
        location.pathname.includes('app-id=') ||
        location.search.includes('draft=true') ||
        (location.hash && location.hash.includes('origin='))) {
      console.log('Redirecting from problematic path to home page');
      navigate('/', { replace: true });
    }
  }, [location, navigate]);
  
  return null;
};

// Component to preload critical resources
const ResourcePreloader = () => {
  useEffect(() => {
    const preloadImages = () => {
      const imagesToPreload = [
        '/images/regions/europe.jpg',
        '/images/regions/asia.jpg',
        '/images/regions/north-america.jpg',
        '/images/regions/south-america.jpg',
        '/images/regions/africa.jpg',
        '/images/regions/australia.jpg',
        '/images/regions/level1.jpg',
        '/images/regions/level2.jpg',
        '/images/regions/level3.jpg',
        '/images/regions/world.jpg',
        '/images/regions/capitals.jpg',
        '/images/regions/fallback.jpg'
      ];

      // Detect if we're in Yandex Games environment
      const inYandexGames = window.location.href.includes('yandex') || 
                          window.location.href.includes('games.s3') || 
                          window.location.origin.includes('app-');
                          
      imagesToPreload.forEach(imagePath => {
        const img = new Image();
        img.src = inYandexGames ? `.${imagePath}` : imagePath;
        console.log(`Preloading image: ${img.src}`);
      });
    };
    
    preloadImages();
  }, []);
  
  return null;
};

// Loading screen component
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

  // Initialize Yandex SDK when app loads
  useEffect(() => {
    const initializeSDK = async () => {
      try {
        console.log("Initializing Yandex Games SDK...");
        const sdk = YandexGamesSDK.getInstance();
        const initialized = await sdk.init();
        setSdkInitialized(initialized);
        
        if (initialized) {
          console.log("Yandex Games SDK initialized successfully");
          // Call ready() immediately after successful initialization
          const ysdk = (window as any).ysdk;
          if (ysdk && ysdk.features && ysdk.features.LoadingAPI) {
            try {
              ysdk.features.LoadingAPI.ready();
              console.log('Called LoadingAPI.ready() after initialization');
            } catch (e) {
              console.warn('Error calling LoadingAPI.ready():', e);
            }
          }
        } else {
          console.warn("Failed to initialize Yandex Games SDK", sdk.getInitError());
          // Show notification only in dev mode
          if (import.meta.env.DEV) {
            toast({
              title: "Предупреждение",
              description: `SDK Яндекс.Игр не инициализирован: ${sdk.getInitError() || 'неизвестная ошибка'}`,
              variant: "destructive",
            });
          }
        }

        // Show app after a short timeout regardless of SDK initialization result
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
    
    // Check for empty hash or problematic paths and redirect
    const redirectIfNeeded = () => {
      const isYandexGames = window.location.href.includes('yandex') || 
                            window.location.href.includes('games.s3') || 
                            window.location.origin.includes('app-');
      
      if (isYandexGames && (!window.location.hash || window.location.hash === '#')) {
        console.log('No hash detected, setting default route');
        window.location.replace(window.location.origin + window.location.pathname.split('?')[0] + '#/');
      }
    };
    
    redirectIfNeeded();
  }, []);

  // Show loading screen while SDK initializes
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
            <RedirectHandler />
            <ResourcePreloader />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/game" element={<Game />} />
              <Route path="/reference" element={<Reference />} />
              <Route path="/category/:categoryId" element={<CategoryPage />} />
              <Route path="/capitals" element={<Capitals />} />
              <Route path="/capitals/:regionId" element={<CapitalsOptions />} />
              <Route path="/capitals/game" element={<CapitalsGame />} />
              {/* Automatically redirect Yandex Games URL parameters to home */}
              <Route path="/origin=*" element={<Navigate to="/" replace />} />
              <Route path="/app-id=*" element={<Navigate to="/" replace />} />
              <Route path="/draft=*" element={<Navigate to="/" replace />} />
              {/* Redirect all other unknown routes to home page for Yandex Games environment */}
              <Route path="*" element={
                window.location.href.includes('yandex') || 
                window.location.href.includes('games.s3') || 
                window.location.origin.includes('app-') 
                  ? <Navigate to="/" replace /> 
                  : <NotFound />
              } />
            </Routes>
          </HashRouter>
        </GameProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
