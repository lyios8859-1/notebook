import Router from 'koa-router';
const router = new Router();

router.get('/', async (ctx: any) => {
  ctx.body = 'Hello World! Article';
});

// app 指向 koa 实例
// app.use(async (ctx) => {
//   await ctx.render('main', { title: 'Tom' });
// });
router.get('/page', async (ctx) => {
  await ctx.response.ctx.render('main', { title: 'Tom' });
});

export = router;
