
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import YandexGamesSDK from "../services/YandexGamesSDK";

const NotFound = () => {
  const location = useLocation();
  const [sdkStatus, setSdkStatus] = useState<string>("Проверка...");
  const [debugInfo, setDebugInfo] = useState<string>("");

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
    
    // Попытка инициализации SDK и получения статуса
    const checkSDK = async () => {
      try {
        const sdk = YandexGamesSDK.getInstance();
        const isInitialized = await sdk.init();
        setSdkStatus(isInitialized 
          ? "Yandex SDK инициализирован успешно" 
          : "Ошибка при инициализации Yandex SDK");
        
        // Собираем дополнительную информацию для отладки
        setDebugInfo(`
          Текущий путь: ${location.pathname}
          Полный URL: ${window.location.href}
          User Agent: ${navigator.userAgent}
          Режим: ${import.meta.env.MODE}
        `);
      } catch (err) {
        setSdkStatus(`Ошибка SDK: ${err instanceof Error ? err.message : 'Неизвестная ошибка'}`);
      }
    };
    
    checkSDK();
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-deep p-4">
      <div className="max-w-md w-full bg-black/30 dark-blur rounded-xl p-6 text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-gray-100 mb-6">Страница не найдена</p>
        
        <div className="mb-6">
          <p className="text-yellow-400 mb-2">Состояние SDK:</p>
          <p className="text-sm bg-black/20 p-2 rounded">{sdkStatus}</p>
        </div>
        
        <a 
          href="/#/" 
          className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Вернуться на главную
        </a>
        
        {import.meta.env.DEV && debugInfo && (
          <div className="mt-8 text-left">
            <p className="text-yellow-400 mb-2">Отладочная информация:</p>
            <pre className="text-xs bg-black/20 p-3 rounded overflow-x-auto">
              {debugInfo}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotFound;
