export interface GreetingScreenProps {
  onComplete: () => void;
}

export interface LoadingIndicatorProps {
  progress: number;
}

export interface FontConfig {
  name: string;
  files: string[];
}

export interface AssetLoadingProgress {
  loaded: number;
  total: number;
  progress: number;
}
