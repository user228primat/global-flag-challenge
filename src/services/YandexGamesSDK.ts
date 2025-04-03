
interface PlayerProgress {
  gameStats: Record<string, any>;
  highScores: Record<string, number>;
}

class YandexGamesSDK {
  private static instance: YandexGamesSDK;
  private ysdk: any = null;
  private isInitialized: boolean = false;
  private initAttempted: boolean = false;
  private initError: string | null = null;
  private initPromise: Promise<boolean> | null = null;

  private constructor() {}

  /**
   * Get the singleton instance of YandexGamesSDK
   */
  public static getInstance(): YandexGamesSDK {
    if (!YandexGamesSDK.instance) {
      YandexGamesSDK.instance = new YandexGamesSDK();
    }
    return YandexGamesSDK.instance;
  }

  /**
   * Get last initialization error
   */
  public getInitError(): string | null {
    return this.initError;
  }

  /**
   * Check if SDK is initialized
   */
  public isSDKInitialized(): boolean {
    return this.isInitialized;
  }

  /**
   * Initialize the Yandex Games SDK
   */
  public async init(): Promise<boolean> {
    // Если инициализация уже запущена, возвращаем существующий промис
    if (this.initPromise) {
      return this.initPromise;
    }
    
    // Создаем новый промис для инициализации
    this.initPromise = this.initializeSDK();
    return this.initPromise;
  }

  private async initializeSDK(): Promise<boolean> {
    // Сбрасываем ошибку перед попыткой инициализации
    this.initError = null;
    
    // Предотвращаем повторную попытку
    if (this.initAttempted && this.isInitialized) {
      console.log('SDK уже инициализирован');
      return true;
    }
    
    this.initAttempted = true;
    
    try {
      console.log('Проверка окружения:', {
        isWindow: typeof window !== 'undefined',
        hasYaGames: typeof window !== 'undefined' && 'YaGames' in window,
        location: window.location.href,
        hash: window.location.hash,
        pathname: window.location.pathname
      });
      
      // Проверяем наличие YaGames в window
      if (typeof window !== 'undefined' && 'YaGames' in window) {
        // Устанавливаем таймаут на инициализацию для отлова зависаний
        const initTimeout = new Promise<false>((resolve) => {
          setTimeout(() => {
            this.initError = 'Превышено время ожидания инициализации Yandex SDK';
            console.warn('Timeout exceeded for YaGames initialization');
            resolve(false);
          }, 10000);
        });
        
        // Пытаемся инициализировать SDK
        console.log('Попытка инициализации Yandex Games SDK...');
        
        // Создаем обещание для инициализации SDK
        const initPromise = new Promise<boolean>(async (resolve) => {
          try {
            // @ts-ignore
            this.ysdk = await window.YaGames.init();
            this.isInitialized = true;
            console.log('Yandex Games SDK инициализирован успешно');
            resolve(true);
          } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Неизвестная ошибка';
            this.initError = errorMessage;
            console.error('Ошибка инициализации Yandex Games SDK:', error);
            resolve(false);
          }
        });
        
        // Race между инициализацией и таймаутом
        return Promise.race([initPromise, initTimeout]);
      } else {
        this.initError = 'YaGames не найден в глобальном объекте window';
        console.warn('YaGames недоступен - приложение запущено вне среды Яндекс.Игр');
        
        // В режиме разработки считаем это нормальным
        if (import.meta.env.DEV) {
          console.info('Режим разработки: эмулируем успешную инициализацию SDK');
          setTimeout(() => {
            console.log('DEV: Эмулируем успешную инициализацию в течение 1 секунды');
          }, 1000);
        }
        
        return false;
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Неизвестная ошибка';
      this.initError = errorMessage;
      console.error('Критическая ошибка при инициализации Yandex Games SDK:', error);
      return false;
    }
  }

  /**
   * Show fullscreen advertisement
   */
  public async showFullscreenAd(): Promise<void> {
    if (!this.isInitialized || !this.ysdk) {
      console.warn('SDK не инициализирован, невозможно показать полноэкранную рекламу');
      return;
    }

    try {
      console.log('Попытка показать полноэкранную рекламу...');
      await this.ysdk.adv.showFullscreenAdv();
      console.log('Полноэкранная реклама успешно показана');
    } catch (error) {
      console.error('Ошибка показа полноэкранной рекламы:', error);
    }
  }

  /**
   * Show rewarded video with callback for reward
   * @param onRewarded Callback function to run when the player gets the reward
   * @returns Promise<boolean> Whether the reward was given
   */
  public async showRewardedAd(onRewarded: () => void): Promise<boolean> {
    if (!this.isInitialized || !this.ysdk) {
      console.warn('SDK не инициализирован, невозможно показать рекламу с вознаграждением');
      return false;
    }

    try {
      console.log('Попытка показать рекламу с вознаграждением...');
      const result = await this.ysdk.adv.showRewardedVideo({
        callbacks: {
          onRewarded: () => {
            console.log('Реклама с вознаграждением завершена, выдаем награду');
            onRewarded();
            return true;
          },
          onClose: () => {
            console.log('Реклама с вознаграждением закрыта без награды');
          },
          onError: (error: any) => {
            console.error('Ошибка показа рекламы с вознаграждением:', error);
          }
        }
      });
      
      return result && result.rewarded;
    } catch (error) {
      console.error('Ошибка показа рекламы с вознаграждением:', error);
      return false;
    }
  }

  /**
   * Save player progress to Yandex cloud storage
   * @param data Object containing player progress data
   */
  public async saveProgress(data: PlayerProgress): Promise<boolean> {
    if (!this.isInitialized || !this.ysdk) {
      console.warn('SDK не инициализирован, невозможно сохранить прогресс');
      return false;
    }

    try {
      console.log('Сохранение прогресса в облачное хранилище Яндекса:', data);
      await this.ysdk.getStorage().set('player_progress', data);
      console.log('Прогресс сохранен в облачное хранилище Яндекс.Игр');
      return true;
    } catch (error) {
      console.error('Ошибка сохранения прогресса:', error);
      return false;
    }
  }

  /**
   * Load player progress from Yandex cloud storage
   * @returns Progress data from cloud storage or null if not found
   */
  public async loadProgress(): Promise<PlayerProgress | null> {
    if (!this.isInitialized || !this.ysdk) {
      console.warn('SDK не инициализирован, невозможно загрузить прогресс');
      return null;
    }

    try {
      const data = await this.ysdk.getStorage().get('player_progress');
      console.log('Прогресс загружен из облачного хранилища Яндекс.Игр:', data);
      return data as PlayerProgress;
    } catch (error) {
      console.error('Ошибка загрузки прогресса:', error);
      return null;
    }
  }
}

export default YandexGamesSDK;
