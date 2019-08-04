//这个js文件是对 token 做校验的中间件函数
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  //1.获取到 req 请求头中的 accesstoken
  let token = req.get("accesstoken");
  //2.判断token是否存在
  if (!token) {
    //不存在，不允许访问
    //401-验证不通过
    //403 没有权限，不允许访问
    res.status(403).send("不允许访问");
  } else {
    //存在还需要校验合法性
    jwt.verify(token, "HUI", (err, data) => {
      if (err) {
        //校验失败
        res.status(401).send("身份校验失败");
      } else {
        //在后续的代码可能需要用到token中的数据（payload）
        //为了省去后续中再次调用verify可以在这个时刻，将payload信息,给写到req对象上。
        req.userInfo = data; // { userId: xxx } 中间件写入信息到req的操作
        next();
      }
    });
  }
};
