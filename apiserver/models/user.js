//创建user表的schema与之相对应的model
//引入链接了数据库的mongoose对象
const db = require("../config/db");

//定义这张表（集合）的schema对象
const schema = new db.Schema({
  //key : value 设置
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    default: "http://localhost:3000/pig03.jpg"
  }
});

//基于schema生成module对象 表名为users
module.exports = db.model("user", schema);
