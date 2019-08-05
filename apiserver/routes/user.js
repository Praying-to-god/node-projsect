//用户相关的路由代码
const express = require("express");
const bcryptjs = require("bcryptjs"); //密码加密模块
const jwt = require("jsonwebtoken"); //生成令牌 是否登录验证
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const auth = require("../middlewares/auth");
const router = express.Router();

const upload = multer({
  dest: "c:/tmp"
});

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
  let newPassword = bcryptjs.hashSync(password, 10);
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
      //1.生成一个token令牌
      const token = jwt.sign(
        {
          userId: data._id
        },
        "HUI"
      );
      //2.响应
      res.send({
        code: 0,
        msg: "登录成功",
        data: {
          userInfo: {
            userId: data._id,
            username: data.username,
            avatar: data.avatar
          },
          token
        }
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

/**
 * 修改头像
 * POST /api/user/update
 */
router.post("/user/update", auth, upload.single("avatar"), (req, res) => {
  //移动文件到public
  let newFileName = new Date().getTime() + "_" + req.file.originalname; //+原始文件的位置
  let newFilePath = path.resolve(__dirname, "../public", newFileName);

  let data = fs.readFileSync(req.file.path);
  fs.writeFileSync(newFilePath, data);

  // 思考文件以及移动成功，还需要将当前用户的数据库给修改了。
  // 要修改那么需要知道当前用户的 id
  // 只需要，让这个接口经过 auth 中间件的处理。处理之后，就可以使用 req.userInfo.userId
  userModel
    .updateOne(
      {
        _id: req.userInfo.userId
      },
      {
        avatar: `http://localhost:3000/${newFileName}`
      }
    )
    .then(() => {
      res.send({
        code: 0,
        msg: "修改成功",
        data: `http://localhost:3000/${newFileName}`
      });
    });
});

//暴露
module.exports = router;
