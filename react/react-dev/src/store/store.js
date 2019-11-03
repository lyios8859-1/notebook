import AppStateClass from './app-store.js';

export const AppState = AppStateClass;

export default {
  AppState
};

// 专门给服务端渲染使用
export const createStoreMap = () => {
  return {
    appState: new AppState()
  };
};
