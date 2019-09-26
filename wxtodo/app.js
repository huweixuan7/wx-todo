//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    
  },

  writeHistory: function (todo, action, timestamp) {
    var history = wx.getStorageSync('history') || [];
    history.push({
      todo: todo ? {
        content: todo.content || '',
        tags: todo.tags || [],
        extra: todo.extra || ''
      } : null,
      action: action,
      timestamp: timestamp
    });
    wx.setStorageSync('history', history);
  }
})