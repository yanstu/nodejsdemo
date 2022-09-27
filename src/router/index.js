const fs = require("fs");

const koaRouter = require("koa-router");

const router = new koaRouter();

fs.readdirSync(__dirname).forEach((file) => {
  if (file !== "index.js") {
    let r = require("./" + file);
    router.use(r.routes());
  }
});

module.exports = router;
