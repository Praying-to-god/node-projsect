const setUserInfo = () => {
  //从本地存储中拿出当前登录的用户信息，来修改页面相应的位置
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

const getStudentList = () => {
  //这个学生接口要做登录校验，将token写入请求头
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

$(function() {
  // 1. 设置用户信息
  setUserInfo();

  //2.学生查询请求
  getStudentList();
});
