// 定义数据
let curPageNum = 1; // 当前的页码数
let curPageSize = 5; // 当前的每页显示条数

//获取学生数据列表的方法
let getStudent = () => {
  $.get(
    `${BaseURL}/api/getStudentListBySearch`,
    {
      pageNum: curPageNum,
      pageSize: curPageSize,
      name: $("#searchName").val()
    },
    res => {
      console.log(res);
      if (res.code === 0) {
        //将数据渲染到前端页面上
        let data = res.data.list;
        let html = "";
        data.forEach((item, index) => {
          html += `<tr>
                <td>${index + 1}</td>
                <td class="cName">${item.name}</td>
                <td class="cAge">${item.age}</td>
                <td class="cSex">${item.sex}</td>
                <td>
                  <button type="button"
                  class="btn btn-primary"
                  id="changeMes"
                  data-toggle="modal"
                  data-target="#mymodal"
                  style="padding: 1px 6px;position: relative;top: -1px">修改</button>
                  <div
                  id="mymodal"
                  class="modal fade"
                  tabindex="-1"
                  role="dialog"
                  aria-labelledby="gridSystemModalLabel"
                >
                  <div class="modal-dialog" role="document">
                    <div class="modal-content">
                      <div class="modal-header">
                        <button
                          type="button"
                          class="close"
                          data-dismiss="modal"
                          aria-label="Close"
                        >
                          <span aria-hidden="true">&times;</span>
                        </button>
                        <h4 class="modal-title" id="gridSystemModalLabel">
                          修改信息
                        </h4>
                      </div>
                      <div class="modal-body">
                        <!-- 内容区 -->

                        <form class="form-horizontal">
                          <div class="form-group">
                            <label
                              for="inputEmail3"
                              class="col-sm-2 control-label"
                              >修改姓名</label
                            >
                            <div class="col-sm-10">
                              <input
                                type="email"
                                class="form-control"
                                id="inputEmail3"
                                placeholder="Name"
                                change="mName"
                              />
                            </div>
                          </div>

                          <div class="form-group">
                            <label
                              for="inputEmail3"
                              class="col-sm-2 control-label"
                              >修改年龄</label
                            >
                            <div class="col-sm-10">
                              <input
                                type="email"
                                class="form-control"
                                id="inputEmail3"
                                placeholder="Age"
                              />
                            </div>
                          </div>

                          <div class="form-group">
                            <label
                              for="inputEmail3"
                              class="col-sm-2 control-label"
                              >修改性别也是可以</label
                            >
                            <div class="col-sm-10">
                              <input
                                type="email"
                                class="form-control"
                                id="inputEmail3"
                                placeholder="Sex"
                              />
                            </div>
                          </div>
                        </form>
                      </div>
                      <div class="modal-footer">
                        <button
                          type="button"
                          class="btn btn-default hov"
                          data-dismiss="modal"
                          onmouseout="this.style.color='#fff'"
                        >
                          关闭
                        </button>
                        <button type="button" class="btn btn-primary">
                          保存修改
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                  <button class="del" data-id="${item._id}" >删除</button>
                </td>
              </tr>`;
        });
        $("#myBody").html(html);

        //将分页渲染到前端页面上
        let totalPage = res.data.totalPage; //总页数
        console.log(totalPage);
        let pageHtml = "";
        let prevPage = curPageNum - 1 > 1 ? curPageNum - 1 : 1;
        let nextPage = curPageNum + 1 < totalPage ? curPageNum + 1 : totalPage; // 下一页的页码

        pageHtml += `<li  class="ht-pagination__item prev" data-page=${prevPage}> <a href="#"><i class="iconfont icon-fenye_"></i></a></li>    `;
        for (let i = 1; i <= totalPage; i++) {
          pageHtml += `<li class="ht-pagination__item" data-page=${i} id = '${
            curPageNum === i ? "active" : ""
          }'><a href="#">${i}</a></li>`;
        }
        pageHtml += `<li class="ht-pagination__item next" data-page=${nextPage}><a href="#"><i class="iconfont icon-fenye_1"></i></a></li>`;
        $(".myPage").html(pageHtml);
      } else {
        alert(res.msg);
      }
    }
  );
};

// 从本地存储中拿出当前登录的用户信息，来修改页面相应的位置
const setUserInfo = () => {
  let userInfo = sessionStorage.getItem("userInfo");
  if (userInfo) {
    //存在
    userInfo = JSON.parse(userInfo);
    $(".avatar").attr("src", userInfo.avatar);
    $(".userEm").html(userInfo.username);
  } else {
    //不存在
    location.href = "/login.html";
  }
};

//这个学生接口要做登录校验，将token写入请求头
const getStudentList = () => {
  $.ajax({
    url: `${BaseURL}/api/student`,
    method: "GET",
    headers: {
      // 自定义一个AccessToken的请求头，值是token
      // ? 当我们自定义了请求头之后，那么 cors 的跨域会出问题。(设置相关请求头)
      // ? 请求发送了两次，第一个是一个请求方式为 OPTIONS 的请求，预检请求
      AccessToken: sessionStorage.getItem("token")
    },
    success: res => {
      console.log(res);
    }
  });
};

//删除
const delStudent = studentId => {
  $.post(`${BaseURL}/api/deleteStudent`, { abc: studentId }, res => {
    console.log(res);
    if (res.code === 0) {
      alert("删除成功");
      //重新加载数据 达到刷新效果
      getStudent();
    } else {
      alert(res.msg);
    }
  });
};

$(function() {
  //页面加载数据
  getStudent();

  // 1. 设置用户信息
  setUserInfo();

  //2.学生查询请求
  getStudentList();

  //点击删除
  $("#myBody").on("click", ".del", function() {
    //点击获取删除键上的data-id 也就是这个字段的id
    let id = $(this).data("id");
    delStudent(id);
  });

  //点击分页
  $(".myPage").on("click", "li", function() {
    //获得当前点击的页数
    let page = $(this).data("page");
    console.log(page);
    curPageNum = page;
    getStudent();
  });

  //点击搜索
  $("#searchBtn").click(() => {
    curPageNum = 1; //从第一页开始搜索

    getStudent();
  });

  //点击修改
  $("#myBody").on("click", "tr td #changeMes", function() {
    //获得表格中的内容
    let $this = $(this);
    let cName = $this
      .closest("td")
      .siblings(".cName")
      .text();
    let cAge = $this
      .closest("td")
      .siblings(".cAge")
      .text();
    let cSex = $this
      .closest("td")
      .siblings(".cSex")
      .text();
    //修改模态框中内容
    $this
      .next()
      .find("input[change=mName]")
      .val(cName);
  });
});
