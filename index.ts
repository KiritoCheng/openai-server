import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import { routes } from "./api/ai";

const app: express.Application = express();

const port: number = 1200;

// 载入中间件
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

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

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}/`);
});
