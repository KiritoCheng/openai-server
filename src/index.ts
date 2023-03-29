import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import { routes } from "./api/ai";
import { jsonResponse } from "./middlewares/jsonResponse";
import https from "https";
import fs from "fs";

const app: express.Application = express();

const port: number = 1200;

// 载入中间件
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(jsonResponse);

// allow custom header and CORS
app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", " 3.2.1");
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

routes(app);

// https 配置
const httpsOption = {
  key: fs.readFileSync("/path/ssl/kiritosa.com/key.pem"),
  cert: fs.readFileSync("/path/ssl/kiritosa.com/fullchain.pem"),
};

https.createServer(httpsOption, app).listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
