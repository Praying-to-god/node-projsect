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

//修改头像
const updateAvatar = () => {
  //ajax请求特殊
  //1. 不像普通的ajax请求那样，直接传递 input val(),现在的input是file类型的 直接val得到的是本地文件路径是字符串
  // 2. 需要的是这个文件的信息对象  dom.files[0] 文件信息对象
  // 3. ajax 需要做一下调整console.log($("#myFile")[0].files[0]);
  let formData = new FormData();
  formData.append("avatar", $("#myFile")[0].files[0]);
  $.ajax({
    url: `${BaseURL}/api/user/update`,
    method: "POST",
    data: formData,
    headers: {
      AccessToken: sessionStorage.getItem("token")
    },
    processData: false,
    contentType: false,
    success: res => {
      console.log(res.data);
      let userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
      userInfo.avatar = res.data; //修改后台给的新的头像地址 先从本地存储中拿出来修改完在拿进去
      sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
      location.reload();
    }
  });
};

$(function() {
  // 1. 设置用户信息
  setUserInfo();

  $("#myXiu").click(function() {
    // 1. 判断是否选择了文件
    if ($("#myFile").val()) {
      // 可以修改头像了
      updateAvatar();
    }
  });
});
