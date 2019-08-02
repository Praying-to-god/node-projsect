//建立MongoDB连接对象
//引入mongoose
const mongoose = require("mongoose");

//定义数据库的链接地址
const url = "mongodb://127.0.0.1:27017/147";

//mongoose.connect 链接数据库
mongoose
  .connect(url, { useNewUrlParser: true })
  .then(() => {
    console.log("数据库链接成功");
  })
  .catch(err => {
    console.log("数据库链接失败");
    console.log(err);
  });

//暴露链接数据库的mongoose对象
module.exports = mongoose;
