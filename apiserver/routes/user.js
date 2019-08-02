//用户相关的路由代码
const express = require("express");
const bcryptjs = require("bcryptjs"); //密码加密模块
const router = express.Router();

//引入模型
const userModel = require("../models/user");

/**
 * 注册
 * POST /api/sign-up
 */
router.post("/sign-up", (req, res) => {
  //获取前端传递的账号 密码
  let username = req.body.username;
  let password = req.body.password;

  //对密码加密
  let newPassword = bcryptjs.hashSync("password", 10);
  let user = new userModel({
    //生成模型的实例对象
    username,
    password: newPassword
  });
  //将数据存入数据库
  user
    .save()
    .then(() => {
      res.send({
        code: 0,
        msg: "注册成功"
      });
    })
    .catch(err => {
      res.send({
        code: -1,
        msg: "注册失败"
      });
    });
});

/**
 * 登录
 * POST /api/sign-in
 */
router.post("/sign-in", async (req, res) => {
  let username = req.body.username;
  let password = req.body.password;

  let data = await userModel.findOne({ username });
  if (data) {
    //用户名存在匹配密码
    if (bcryptjs.compareSync(password, data.password)) {
      //密码匹配成功
      res.send({
        code: 0,
        msg: "登录成功"
      });
    } else {
      res.send({
        code: -1,
        msg: "密码错误"
      });
    }
  } else {
    res.send({
      code: -1,
      msg: "用户名错误"
    });
  }
});

//暴露
module.exports = router;
