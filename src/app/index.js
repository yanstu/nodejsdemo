const path = require("path");
const Koa = require("koa");
const KoaBody = require("koa-body");
const KoaStatic = require("koa-static");
const parameter = require("koa-parameter");
const app = new Koa();
const router = require("../router");
const errHandler = require("./errHandler");
const swagger = require("../util/swagger");
const { koaSwagger } = require("koa2-swagger-ui");
const uploadDir = path.join(__dirname + "/../upload");
const sslify = require("koa-sslify").default;

app.use(sslify());

app.use(
  KoaBody({
    multipart: true,
    formidable: {
      uploadDir,
      keepExtensions: true,
    },
  })
);

app.use(
  koaSwagger({
    routePrefix: "/swagger",
    swaggerOptions: {
      url: "/swagger.json",
    },
  })
);

app.use(parameter(app));

app.use(router.routes()).use(swagger.routes()).use(router.allowedMethods());

app.use(KoaStatic(uploadDir));

// 配置跨域请求中间件(服务端允许跨域请求)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin); // 设置允许来自哪里的跨域请求访问（值为*代表允许任何跨域请求，但是没有安全保证）
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS"); // 设置允许接收的请求类型
  res.header("Access-Control-Allow-Headers", "Content-Type,request-origin"); // 设置请求头中允许携带的参数
  res.header("Access-Control-Allow-Credentials", "true"); // 允许客户端携带证书式访问。保持跨域请求中的Cookie。注意：此处设true时，Access-Control-Allow-Origin的值不能为 '*'
  res.header("Access-control-max-age", 1000); // 设置请求通过预检后多少时间内不再检验，减少预请求发送次数
  next();
});

app.on("error", errHandler);

app.on("success", (res, ctx) => {
  ctx.body = {
    code: "0",
    message: "成功",
    result: res,
  };
});

module.exports = app;
