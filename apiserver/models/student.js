//创建student表的schema与之相对应的model
//引入链接了数据库的mongoose对象
const db = require("../config/db");

//定义这张表（集合）的schema对象
const schema = new db.Schema({
  //key : value 设置
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    default: 18
  },
  sex: {
    type: Number,
    default: 1
  }
});

//基于schema生成module对象 表名为students
module.exports = db.model("student", schema);
