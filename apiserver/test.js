//下载 jsonwebtoken

const jwt = require("jsonwebtoken");

// const payload = {
//   //定义令牌内容
//   name: "张三"
// };

// const secret = "123"; //定义密钥

// const token = jwt.sign(payload, secret); //生成token
// console.log(token);
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoi5byg5LiJIiwiaWF0IjoxNTY0ODk5MDMzfQ.iOWB0IHYQS6mWVcaVfdPVcXA2BiYEmqoINJ5CzGyk0g
//token由三部分组成：header(头).payload(负载).signature(签名)

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoi5byg5LiJIiwiaWF0IjoxNTY0ODk5MDMzfQ.iOWB0IHYQS6mWVcaVfdPVcXA2BiYEmqoINJ5CzGyk0g";
const secret = "123";

jwt.verify(token, secret, (err, data) => {
  if (err) {
    console.log(err);
  } else {
    console.log(data);
    //{ name: '张三', iat: 1564899033 } iat为令牌的签发时间
  }
});
