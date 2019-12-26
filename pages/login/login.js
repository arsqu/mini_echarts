// pages/login/login.js
import config from '../../config.js'
const app = getApp();
Page({
  data: {
    user: false,
    pass: false
  },
  onLoad(options) {},
  onReady() {},
  onShow() {},
  onHide() {},
  onUnload() {},
  toLogin(params) {
    wx.showToast({
      title: '登录中',
      icon: 'loading'
    });
    wx.request({
      url: config.login,
      method: 'POST',
      data: params,
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      success: function(res) {
        if (res) {
          wx.setStorageSync('isLogin', '1');
          wx.setStorageSync('userName', params.userName);
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
    this.toLogin({
      userName: v.user,
      passWord: v.pass
    });
  }
})