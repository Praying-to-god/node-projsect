//引用需要的模块
const express = require("express");
const server = express();

//引入拆分出去的路由文件
const userRouter = require("./routes/user");
const studentRouter = require("./routes/student");

//中间件
server.use(express.json());
server.use(express.urlencoded({ extended: true })); //req.body

//静态资源托管
server.use(express.static("./public"));

//跨域响应头设置

//路由 http://localhost:3000/api
server.use("/api", [userRouter, studentRouter]);

server.listen(3000);
