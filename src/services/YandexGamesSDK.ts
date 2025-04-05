
/**
 * Service for interacting with the Yandex Games SDK
 */
class YandexGamesSDK {
  private static instance: YandexGamesSDK;
  private initialized: boolean = false;
  private initTimedOut: boolean = false;
  private initError: string | null = null;
  private isProcessingAd: boolean = false;
  private INIT_TIMEOUT_MS: number = 5000;
  private initPromise: Promise<boolean> | null = null;
  
  // Constructor is private for singleton pattern
  private constructor() {}
  
  /**
   * Gets the singleton instance of the YandexGamesSDK
   * @returns The YandexGamesSDK instance
   */
  public static getInstance(): YandexGamesSDK {
    if (!YandexGamesSDK.instance) {
      YandexGamesSDK.instance = new YandexGamesSDK();
    }
    return YandexGamesSDK.instance;
  }
  
  /**
   * Initializes the Yandex Games SDK with timeout protection
   * @returns A promise that resolves to true if initialization is successful, false otherwise
   */
  public init(): Promise<boolean> {
    // If already initialized, return
    if (this.initialized) {
      return Promise.resolve(true);
    }
    
    // If already in process of initializing, return existing promise
    if (this.initPromise) {
      return this.initPromise;
    }
    
    this.initPromise = new Promise<boolean>((resolve) => {
      // Create condition to determine if we're in the Yandex Games environment
      const isYandexGames = 
        typeof window !== 'undefined' &&
        (window.location.hostname.includes('yandex') ||
         window.location.hostname.includes('games.s3') ||
         window.location.hostname.includes('app-'));
      
      console.log('Detected environment:', isYandexGames ? 'Yandex Games' : 'Development/Other');
      
      if (!isYandexGames) {
        console.log('Not in Yandex Games environment, skipping SDK initialization');
        this.initialized = true;
        resolve(true);
        return;
      }
      
      const initTimeoutId = setTimeout(() => {
        console.warn('Yandex Games SDK initialization timed out');
        this.initTimedOut = true;
        this.initError = 'Initialization timed out';
        resolve(false);
      }, this.INIT_TIMEOUT_MS);
      
      try {
        // Try to load YaGames from window
        const YaGames = (window as any).YaGames;
        
        if (!YaGames || typeof YaGames.init !== 'function') {
          console.warn('YaGames not found or not a function');
          this.initError = 'YaGames not found or not a function';
          clearTimeout(initTimeoutId);
          resolve(false);
          return;
        }
        
        console.log('Initializing Yandex Games SDK');
        YaGames
          .init()
          .then((ysdk: any) => {
            console.log('Yandex Games SDK initialized successfully');
            (window as any).ysdk = ysdk; // Store globally for easy access
            this.initialized = true;
            clearTimeout(initTimeoutId);
            resolve(true);
            
            // Pre-initialize ads to avoid delay later
            this.preInitializeAds();
            
            // Let Yandex Games know we're ready
            if (ysdk.features && ysdk.features.LoadingAPI) {
              try {
                ysdk.features.LoadingAPI.ready();
                console.log('Notified Yandex Games that we are ready');
              } catch (e) {
                console.warn('Error calling LoadingAPI.ready():', e);
              }
            }
          })
          .catch((error: any) => {
            console.error('Error initializing Yandex Games SDK:', error);
            this.initError = error?.message || 'Unknown error during initialization';
            clearTimeout(initTimeoutId);
            resolve(false);
          });
      } catch (error) {
        console.error('Exception during Yandex Games SDK initialization:', error);
        this.initError = error instanceof Error ? error.message : 'Unknown exception during initialization';
        clearTimeout(initTimeoutId);
        resolve(false);
      }
    });
    
    return this.initPromise;
  }
  
  /**
   * Gets whether the SDK has been successfully initialized
   * @returns true if the SDK is initialized, false otherwise
   */
  public isInitialized(): boolean {
    return this.initialized;
  }
  
  /**
   * Gets whether the SDK initialization timed out
   * @returns true if initialization timed out, false otherwise
   */
  public didInitTimeout(): boolean {
    return this.initTimedOut;
  }
  
  /**
   * Gets any error that occurred during SDK initialization
   * @returns The error message, or null if no error occurred
   */
  public getInitError(): string | null {
    return this.initError;
  }
  
  /**
   * Pre-initializes ads to avoid delay when showing them later
   */
  private preInitializeAds(): void {
    const ysdk = (window as any).ysdk;
    
    if (!ysdk) return;
    
    if (ysdk.adv) {
      try {
        // Pre-initialize fullscreen ads
        ysdk.adv.getBannerAdStatus().catch(() => {});
        
        // Pre-initialize rewarded video if available
        if (ysdk.adv.showRewardedVideo) {
          ysdk.adv.showRewardedVideo({ callbacks: {} }).catch(() => {});
        }
      } catch (e) {
        console.warn('Error pre-initializing ads:', e);
      }
    }
  }
  
  /**
   * Shows a fullscreen advertisement
   * @returns A promise that resolves when the ad is closed, or rejects if there was an error
   */
  public showFullscreenAd(): Promise<void> {
    if (this.isProcessingAd) {
      return Promise.resolve();
    }
    
    const ysdk = (window as any).ysdk;
    
    if (!ysdk || !ysdk.adv) {
      return Promise.resolve();
    }
    
    this.isProcessingAd = true;
    
    return new Promise<void>((resolve, reject) => {
      try {
        ysdk.adv.showFullscreenAdv({
          callbacks: {
            onClose: (wasShown: boolean) => {
              console.log('Fullscreen ad closed, wasShown:', wasShown);
              this.isProcessingAd = false;
              resolve();
            },
            onError: (error: any) => {
              console.warn('Error showing fullscreen ad:', error);
              this.isProcessingAd = false;
              resolve(); // Resolve instead of reject to prevent cascading failures
            }
          }
        });
      } catch (e) {
        console.error('Exception showing fullscreen ad:', e);
        this.isProcessingAd = false;
        resolve(); // Resolve instead of reject to prevent cascading failures
      }
    });
  }
  
  /**
   * Shows a rewarded video advertisement
   * @returns A promise that resolves to true if the reward should be given, false otherwise
   */
  public showRewardedVideo(): Promise<boolean> {
    if (this.isProcessingAd) {
      return Promise.resolve(false);
    }
    
    const ysdk = (window as any).ysdk;
    
    if (!ysdk || !ysdk.adv) {
      return Promise.resolve(false);
    }
    
    this.isProcessingAd = true;
    
    return new Promise<boolean>((resolve) => {
      try {
        ysdk.adv.showRewardedVideo({
          callbacks: {
            onOpen: () => {
              console.log('Rewarded video opened');
            },
            onRewarded: () => {
              console.log('Rewarded video completed, reward should be given');
              // Don't set isProcessingAd=false here as the ad isn't closed yet
            },
            onClose: () => {
              console.log('Rewarded video closed');
              this.isProcessingAd = false;
              resolve(true);
            },
            onError: (error: any) => {
              console.warn('Error showing rewarded video:', error);
              this.isProcessingAd = false;
              resolve(false);
            }
          }
        });
      } catch (e) {
        console.error('Exception showing rewarded video:', e);
        this.isProcessingAd = false;
        resolve(false);
      }
    });
  }
  
  /**
   * Saves data to Yandex Games cloud storage
   * @param data The data to save
   * @returns A promise that resolves when the data is saved, or rejects if there was an error
   */
  public saveUserData(data: any): Promise<void> {
    const ysdk = (window as any).ysdk;
    
    if (!ysdk || !ysdk.getPlayer || !this.initialized) {
      return Promise.reject('SDK not initialized or player API not available');
    }
    
    return new Promise<void>((resolve, reject) => {
      try {
        ysdk.getPlayer().then((player: any) => {
          if (!player.setData) {
            reject('Player setData method not available');
            return;
          }
          
          player.setData(data)
            .then(() => {
              console.log('Data saved successfully');
              resolve();
            })
            .catch((error: any) => {
              console.error('Error saving data:', error);
              reject(error);
            });
        }).catch((error: any) => {
          console.error('Error getting player:', error);
          reject(error);
        });
      } catch (e) {
        console.error('Exception saving data:', e);
        reject(e);
      }
    });
  }
  
  /**
   * Loads data from Yandex Games cloud storage
   * @returns A promise that resolves with the loaded data, or rejects if there was an error
   */
  public loadUserData(): Promise<any> {
    const ysdk = (window as any).ysdk;
    
    if (!ysdk || !ysdk.getPlayer || !this.initialized) {
      return Promise.reject('SDK not initialized or player API not available');
    }
    
    return new Promise<any>((resolve, reject) => {
      try {
        ysdk.getPlayer().then((player: any) => {
          if (!player.getData) {
            reject('Player getData method not available');
            return;
          }
          
          player.getData()
            .then((data: any) => {
              console.log('Data loaded successfully');
              resolve(data || {});
            })
            .catch((error: any) => {
              console.error('Error loading data:', error);
              reject(error);
            });
        }).catch((error: any) => {
          console.error('Error getting player:', error);
          reject(error);
        });
      } catch (e) {
        console.error('Exception loading data:', e);
        reject(e);
      }
    });
  }
}

export default YandexGamesSDK;
