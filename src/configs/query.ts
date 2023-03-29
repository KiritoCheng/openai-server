import getConnection from "./db";

const query = (sql: any, param?: any) => {
  return new Promise((resolve, reject) => {
    getConnection()
      // 获取连接
      .then((conn: any) => {
        // connected! (unless `err` is set)
        // queries here, when all queries are finished you do connection.release() to return the connection back to the pool
        conn.query(sql, param, (err: any, rows: any) => {
          if (err) {
            reject(err);
            console.log("[sql] - :" + sql);
            console.log("[query_err] - :" + err);
            return;
          }
          resolve(rows);
          // 释放连接
          conn.release();
        });
      })
      .catch((err: any) => {
        reject(err);
      });
  });
};

export default query;
