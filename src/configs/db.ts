import mysql from "mysql2";

// 创建连接池
const pool = mysql.createPool({
  host: "136.244.66.213",
  user: "root",
  password: "Kirito123",
  database: "openai",
  port: 3306,
  waitForConnections: true, // 当连接池没有可用连接时，等待（true）还是抛错（false）
  connectionLimit: 10, // 连接数限制
  queueLimit: 0, // 没有限制
});

const getConnection = () => {
  return new Promise(function (resolve, reject) {
    // 从连接池中获取一个连接
    pool.getConnection(function (err, connection) {
      if (err) {
        reject(err);
        console.log("[connect_err] - :" + err);
        return;
      }

      console.log("connected!");
      resolve(connection);
    });
  });
};

export default getConnection;
