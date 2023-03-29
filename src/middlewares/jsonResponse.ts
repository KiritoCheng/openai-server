export function jsonResponse(req: any, res: any, next: any) {
  // 保存原始的send方法
  const originalSend = res.send;

  // 创建新的send方法
  res.send = function (data: any) {
    // 设置“Content-Type”响应头
    res.setHeader("Content-Type", "application/json");

    // 格式化响应数据
    const responseData = {
      data: data,
      status: res.statusCode,
    };

    // 发送格式化的响应
    originalSend.call(res, JSON.stringify(responseData));
  };

  next();
}
