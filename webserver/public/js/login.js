//登录页面
//登录ajax调用
const loginApi = (username, password) => {
  $.post(`${BaseURL}/api/sign-in`, { username, password }, res => {
    if (res.code == 0) {
      //1.将当前登录的用户信息保存起来
      sessionStorage.setItem("userInfo", JSON.stringify(res.data.userInfo));
      //2.将token也保存起来
      sessionStorage.setItem("token", res.data.token);

      //注册成功 跳登录页面
      alert("登录成功，欢迎");
      location.href = "/index.html";
    } else {
      alert(res.msg);
    }
  });
};

$(function() {
  //页面加载完成时
  //登录按钮点击绑定
  $("#myBtn").click(() => {
    //获取input的值
    let username = $('input[name = "username"]').val();
    let password = $('input[name = "password"]').val();

    //进行表单校验 - 非空
    if (!username || !password) {
      alert("请输入相关信息");
      return;
    }

    //注册
    loginApi(username, password);
  });
});
