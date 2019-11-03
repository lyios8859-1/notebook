import React from 'react';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'mobx-react';
import App from './views/App.jsx';
import { createStoreMap } from './store/store.js';

console.log('-8-'.repeat(8));
// 让 mobx在服务端渲染时,不重复变换数据,比如computed不断计算
// useStaticRendering(true);
const app = (stores, routerContext, url) => {
  console.log(stores, routerContext, url);
  return (
    <Provider {...stores}>
      <StaticRouter context={routerContext} location={url}>
        <App />
      </StaticRouter>
    </Provider>
  );
};
export default app;

export { createStoreMap };
