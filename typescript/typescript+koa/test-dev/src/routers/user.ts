import Router from 'koa-router';
const router = new Router();

router.get('/', async (ctx: any) => {
  ctx.body = 'Hello World! Tom';
});

export = router;
