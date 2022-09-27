const router = require("koa-router")(); //引入路由函数

const swaggerJSDoc = require("swagger-jsdoc");

const path = require("path");

const { SERVER_PORT } = require("../config/config.default");

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "个人网站api接口",
    version: "1.0.0",
    description: "API",
  },
  host: "localhost:" + SERVER_PORT,
  basePath: "/",
};

const options = {
  swaggerDefinition,
  apis: [path.join(__dirname, "../router/*.router.js")], // 写有注解的router的存放地址, 最好path.join()
};

const swaggerSpec = swaggerJSDoc(options);

// 通过路由获取生成的注解文件
router.get("/swagger.json", async (ctx) => {
  ctx.set("Content-Type", "application/json");
  ctx.body = swaggerSpec;
});

module.exports = router;
