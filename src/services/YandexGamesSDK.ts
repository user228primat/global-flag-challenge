
interface PlayerProgress {
  gameStats: Record<string, any>;
  highScores: Record<string, number>;
}

class YandexGamesSDK {
  private static instance: YandexGamesSDK;
  private ysdk: any = null;
  private isInitialized: boolean = false;

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
   * Initialize the Yandex Games SDK
   */
  public async init(): Promise<boolean> {
    try {
      // Check if YaGames is available in window
      if (typeof window !== 'undefined' && 'YaGames' in window) {
        // @ts-ignore
        this.ysdk = await window.YaGames.init();
        this.isInitialized = true;
        console.log('Yandex Games SDK initialized successfully');
        return true;
      } else {
        console.warn('YaGames is not available - running outside of Yandex Games environment');
        return false;
      }
    } catch (error) {
      console.error('Failed to initialize Yandex Games SDK:', error);
      return false;
    }
  }

  /**
   * Show fullscreen advertisement
   */
  public async showFullscreenAd(): Promise<void> {
    if (!this.isInitialized || !this.ysdk) {
      console.warn('SDK not initialized, cannot show fullscreen ad');
      return;
    }

    try {
      await this.ysdk.adv.showFullscreenAdv();
      console.log('Fullscreen ad shown');
    } catch (error) {
      console.error('Error showing fullscreen ad:', error);
    }
  }

  /**
   * Show rewarded video with callback for reward
   * @param onRewarded Callback function to run when the player gets the reward
   * @returns Promise<boolean> Whether the reward was given
   */
  public async showRewardedAd(onRewarded: () => void): Promise<boolean> {
    if (!this.isInitialized || !this.ysdk) {
      console.warn('SDK not initialized, cannot show rewarded ad');
      return false;
    }

    try {
      const result = await this.ysdk.adv.showRewardedVideo({
        callbacks: {
          onRewarded: () => {
            console.log('Rewarded ad completed, giving reward');
            onRewarded();
            return true;
          },
          onClose: () => {
            console.log('Rewarded ad closed without reward');
          },
          onError: (error: any) => {
            console.error('Rewarded ad error:', error);
          }
        }
      });
      
      return result && result.rewarded;
    } catch (error) {
      console.error('Error showing rewarded ad:', error);
      return false;
    }
  }

  /**
   * Save player progress to Yandex cloud storage
   * @param data Object containing player progress data
   */
  public async saveProgress(data: PlayerProgress): Promise<boolean> {
    if (!this.isInitialized || !this.ysdk) {
      console.warn('SDK not initialized, cannot save progress');
      return false;
    }

    try {
      await this.ysdk.getStorage().set('player_progress', data);
      console.log('Progress saved to Yandex.Games cloud');
      return true;
    } catch (error) {
      console.error('Error saving progress:', error);
      return false;
    }
  }

  /**
   * Load player progress from Yandex cloud storage
   * @returns Progress data from cloud storage or null if not found
   */
  public async loadProgress(): Promise<PlayerProgress | null> {
    if (!this.isInitialized || !this.ysdk) {
      console.warn('SDK not initialized, cannot load progress');
      return null;
    }

    try {
      const data = await this.ysdk.getStorage().get('player_progress');
      console.log('Progress loaded from Yandex.Games cloud:', data);
      return data as PlayerProgress;
    } catch (error) {
      console.error('Error loading progress:', error);
      return null;
    }
  }
}

export default YandexGamesSDK;
