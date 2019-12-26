//app.js
App({
  onLaunch: function() {
    // 展示本地存储能力
    var isLogin = wx.getStorageSync('isLogin');
    if (isLogin) {
    console.log('跳转')
      wx.navigateTo({
        url: '/pages/bar/bar'
      })
    }
  },
  globalData: {
    userInfo: null
  }
})