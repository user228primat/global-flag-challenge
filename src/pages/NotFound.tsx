
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import YandexGamesSDK from "../services/YandexGamesSDK";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [sdkStatus, setSdkStatus] = useState<string>("Проверка...");
  const [debugInfo, setDebugInfo] = useState<string>("");

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
      "with hash:",
      location.hash
    );
    
    // Попытка диагностики SDK и получения статуса
    const checkSDK = async () => {
      try {
        const sdk = YandexGamesSDK.getInstance();
        const isInitialized = sdk.isSDKInitialized();
        setSdkStatus(isInitialized 
          ? "Yandex SDK инициализирован успешно" 
          : `Ошибка при инициализации Yandex SDK: ${sdk.getInitError() || "неизвестная ошибка"}`);
        
        // Собираем дополнительную информацию для отладки
        setDebugInfo(`
          Текущий путь: ${location.pathname}
          Хэш: ${location.hash}
          Полный URL: ${window.location.href}
          User Agent: ${navigator.userAgent}
          Режим: ${import.meta.env.MODE}
          SDK Initialized: ${isInitialized}
          SDK Error: ${sdk.getInitError() || "нет"}
        `);
      } catch (err) {
        setSdkStatus(`Ошибка SDK: ${err instanceof Error ? err.message : 'Неизвестная ошибка'}`);
      }
    };
    
    checkSDK();
  }, [location.pathname, location.hash]);

  const handleReturn = () => {
    navigate('/');
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
        
        <button 
          onClick={handleReturn}
          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <ArrowLeft size={18} className="mr-2" />
          Вернуться на главную
        </button>
        
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
