import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import YandexGamesSDK from "../services/YandexGamesSDK";
import { ArrowLeft, HomeIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [sdkStatus, setSdkStatus] = useState<string>("Проверка...");
  const [debugInfo, setDebugInfo] = useState<string>("");
  const [isYandexEnvironment, setIsYandexEnvironment] = useState<boolean>(false);

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
      "with hash:",
      location.hash
    );
    
    // Check if we're in Yandex environment and redirect automatically
    const inYandexGames = window.location.href.includes('yandex') || 
                        window.location.href.includes('games.s3') || 
                        window.location.href.includes('app-id=');
    
    setIsYandexEnvironment(inYandexGames);
    
    // Auto-redirect to home in Yandex Games after a short delay
    if (inYandexGames) {
      console.log("Detected Yandex Games environment, auto-redirecting to home page in 1 second");
      const redirectTimer = setTimeout(() => {
        handleDirectHomeClick();
      }, 1000);
      
      return () => clearTimeout(redirectTimer);
    }
    
    // Attempt SDK diagnostics and get status
    const checkSDK = async () => {
      try {
        const sdk = YandexGamesSDK.getInstance();
        const isInitialized = sdk.isInitialized();
        setSdkStatus(isInitialized 
          ? "Yandex SDK инициализирован успешно" 
          : `Ошибка при инициализации Yandex SDK: ${sdk.getInitError() || "неизвестная ошибка"}`);
                
        // Collect additional debug info
        setDebugInfo(`
          Текущий путь: ${location.pathname}
          Хэш: ${location.hash}
          Полный URL: ${window.location.href}
          User Agent: ${navigator.userAgent}
          Режим: ${import.meta.env.MODE}
          SDK Initialized: ${isInitialized}
          SDK Error: ${sdk.getInitError() || "нет"}
          В окружении Яндекс.Игр: ${isYandexEnvironment ? "Да" : "Нет"}
        `);
      } catch (err) {
        setSdkStatus(`Ошибка SDK: ${err instanceof Error ? err.message : 'Неизвестная ошибка'}`);
      }
    };
    
    checkSDK();
  }, [location.pathname, location.hash, navigate]);

  const handleReturn = () => {
    navigate('/');
  };

  const handleDirectHomeClick = () => {
    // Direct navigation to home page, bypassing redirects
    window.location.href = window.location.origin + window.location.pathname.split('?')[0] + '#/';
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-deep p-4">
      <div className="max-w-md w-full bg-black/30 dark-blur rounded-xl p-6 text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-gray-100 mb-6">Страница не найдена</p>
        
        <div className="mb-6">
          <p className="text-yellow-400 mb-2">Состояние SDK:</p>
          <p className="text-sm bg-black/20 p-2 rounded">{sdkStatus}</p>
        </div>
        
        <div className="flex flex-col space-y-3">
          <Button 
            onClick={handleReturn}
            className="flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft size={18} className="mr-2" />
            Вернуться на главную
          </Button>
          
          {isYandexEnvironment && (
            <Button 
              onClick={handleDirectHomeClick}
              variant="outline"
              className="flex items-center justify-center px-6 py-3 border-blue-500 text-blue-400 rounded-lg hover:bg-blue-900/20 transition-colors"
            >
              <HomeIcon size={18} className="mr-2" />
              Прямой переход на главную
            </Button>
          )}
        </div>
        
        {(import.meta.env.DEV || true) && debugInfo && (
          <div className="mt-8 text-left">
            <p className="text-yellow-400 mb-2">Отладочная информация:</p>
            <pre className="text-xs bg-black/20 p-3 rounded overflow-x-auto whitespace-pre-wrap">
              {debugInfo}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotFound;
