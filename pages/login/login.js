// pages/login/login.js
const app = getApp();
Page({
  data: {
    user: false,
    pass: false
  },
  onLoad(options) {
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady() {
    // 页面渲染完成
  },
  onShow() {
    // 页面显示
  },
  onHide() {
    // 页面隐藏
  },
  onUnload() {
    // 页面关闭
  },
  toLogin(params) {
    wx.showToast({
      title: '登录中',
      icon: 'loading'
    });
    wx.request({
      url: 'http://localhost:8873/userContro/selectOneUser',
      method: 'POST',
      data: params,
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      success: function(res) {
        if(res){
          wx.navigateTo({
            url: '/pages/bar/bar'
          })
        }
      },
      fail() {
        console.log('err');
      }
    })
  },
  login(e) {
    var v = e.detail.value;
    this.setData({
      'user': false,
      'pass': false
    })
    if (!v.user) {
      this.setData({
        'user': true
      })
    }
    if (!v.pass) {
      this.setData({
        'pass': true
      })
    }
    if (!v.user || !v.pass) {
      // wx.showModal({
      //   title: '登录失败',
      //   content: '账号或密码不正确',
      //   confirmColor: '#b02923',
      //   showCancel: false
      // })
      return;
    }
    //userName: admin
    // passWord: admin123
    this.toLogin({
      userName: v.user,
      passWord: v.pass
    });
  }
})