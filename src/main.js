const app = require("./app");
let fs = require("fs");
const https = require("https");

const { SERVER_PORT } = require("./config/config.default");

/*app.listen(SERVER_PORT, () => {
  console.log("running >>>");
});*/

https
  .createServer(
    {
      key: fs.readFileSync("C:/ssl/private.key"),
      cert: fs.readFileSync("C:/ssl/certificate.crt"),
    },
    app.callback()
  )
  .listen(SERVER_PORT, (err) => {
    if (err) {
      console.log("server error: ", err);
    } else {
      console.log("running >>>");
    }
  });
