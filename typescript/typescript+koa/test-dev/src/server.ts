
import Koa from 'koa';
import hbs from 'koa-hbs';
import path from 'path';

import router from './routers/index';

const app = new Koa();

// 注册模板
app.use(hbs.middleware({
  extname: '.html',
  viewPath: path.join(__dirname, 'views')
}));

// 注册路由
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => {
  console.log('Server is running at http://localhost:3000');
  console.log('Press CTRL-C to stop \n');
});

export = app;
