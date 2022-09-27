const koaRouter = require('koa-router');

const { xintiao } = require('../controller/common.controller');

const router = new koaRouter({ prefix: '/api' });

router.get('/xintiao', xintiao);
router.post('/xintiao', xintiao);

module.exports = router;
