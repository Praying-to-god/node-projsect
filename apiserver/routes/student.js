//学生相关的路由代码
const express = require("express");
const auth = require("../middlewares/auth"); //做校验的中间件
const router = express.Router();

const studentModel = require("../models/student");

/**
 * 学生查询 模糊查询有分页
 * GET /api/student
 */
router.get("/student", auth, async (req, res) => {
  let pageNum = parseInt(req.query.pageNum) || 1; //页数
  let pageSize = parseInt(req.query.pageSize) || 5; //页面条数

  let searchName = req.query.searchName;
  searchName = new RegExp(searchName);
  //获得数据总条数
  let num = await studentModel.find({ name: searchName }).count();
  //计算总页数
  let totalPage = Math.ceil(num / pageSize);

  //与搜索条件匹配
  let studentList = await studentModel
    .find({ name: searchName })
    .skip((pageNum - 1) * pageSize)
    .limit(pageSize);
  res.send({
    code: 0,
    msg: "ok",
    data: {
      list: studentList,
      totalPage
    }
  });
});

/**
 * 学生添加
 * POST /api/student
 */
router.post("/student", (req, res) => {
  let student = new studentModel(req.body);
  student
    .save()
    .then(data => {
      res.send({
        code: 0,
        msg: "添加成功"
      });
    })
    .catch(err => {
      res.send({
        code: -1,
        msg: err.message
      });
    });
});

//搜索 GET api/getStudentListBySearch 与student相同 避免占用再写一个
router.get("/getStudentListBySearch", async (req, res) => {
  //获取前端传递过来的数据 pageNum当前第几页 pageSize每页显示多少条 searchName
  let pageNum = parseInt(req.query.pageNum) || 1;
  let pageSize = parseInt(req.query.pageSize) || 5;
  let searchName = req.query.name;
  searchName = new RegExp(searchName); //将这个搜索字符串变为正则
  //获得数据总条数
  let num = await studentModel.find({ name: searchName }).count();
  //计算总页数
  let totalPage = Math.ceil(num / pageSize);
  //与搜索条件匹配
  let studentList = await studentModel
    .find({ name: searchName })
    .skip((pageNum - 1) * pageSize)
    .limit(pageSize);
  res.send({
    code: 0,
    msg: "ok",
    data: {
      list: studentList,
      totalPage
    }
  });
});

//删除 POST api/deleteStudent
router.post("/deleteStudent", (req, res) => {
  //获取前端传来的数据 要删除的学生id
  let studentId = req.body.abc; //abc

  //删除 模型上有一个deleteOne方法（只删除一个）
  studentModel
    .deleteOne({ _id: studentId })
    .then(data => {
      console.log(data);
      res.send({
        code: 0,
        msg: "删除成功"
      });
    })
    .catch(err => {
      res.send({
        code: -1,
        msg: err.message
      });
    });
});

//暴露
module.exports = router;
