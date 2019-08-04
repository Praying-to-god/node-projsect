//登录页面
//注册ajax调用
const registerApi = (username, password) => {
  $.post(`${BaseURL}/api/sign-up`, { username, password }, res => {
    if (res.code == 0) {
      //注册成功 跳登录页面
      alert("注册成功，欢迎啊");
      location.href = "/login.html";
    } else {
      alert(res.msg);
    }
  });
};

$(function() {
  //页面加载完成时
  //注册按钮点击绑定
  $("#myBtn").click(() => {
    //获取input的值
    let username = $('input[name = "username"]').val();
    let password = $('input[name = "password"]').val();
    let repassword = $('input[name = "repassword"]').val();
    //进行表单校验 - 非空
    if (!username || !password || !repassword) {
      alert("请输入相关信息");
      return;
    }
    if (password != repassword) {
      alert("两次输入密码不一致");
      return;
    }
    //注册
    registerApi(username, password);
  });
});
