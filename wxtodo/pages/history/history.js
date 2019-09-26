// pages/history/history.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    history:[],
    actionTexts: {
      'create': '创建',
      'finish': '完成',
      'restart': '重启',
      'delete': '删除',
      'clear': '清空所有待办事项',
      'restartAll': '重启所有待办事项',
      'finishAll': '完成所有待办事项'
    },
    groupedHistory: {},
    dates: []

  },

  //自定义函数

  processHistory: function () {
    var history = this.data.history;
    var dates = [];
    var groupedHistory = history.map(function (item, index) {
      item.pos = index;
      var d = new Date(item.timestamp);
      item.date = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
      item.time = d.getHours() + ':' + d.getMinutes();
      return item;
    }).reverse().reduce(function (prev, cur) {
      if (!prev[cur.date]) {

        prev[cur.date] = [];
        dates.push(cur.date);
      }

      prev[cur.date].push(cur);

      return prev;
    }, {});

    this.setData({
      groupedHistory: groupedHistory,
      dates: dates
    });

  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let history = wx.getStorageSync('history')||[]
    if (history) {
      this.setData({ history: history });
      this.processHistory();
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})