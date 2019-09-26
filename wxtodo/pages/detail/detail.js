// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: '',
    tag: '',
    tags: [],
    extra: ''
  },
  //事件处理函数
  inputContent:function(e){
    this.setData({
      content: e.detail.value.trim()
    })
  },
  inputExtra: function (e) {
    this.setData({ extra: e.detail.value.trim() });
  },
  addTag:function(e){
    let tags = this.data.tags;
    if (!e.detail.value.trim()){return}
    tags.push(e.detail.value.trim())
    this.setData({
      tags:tags,
      tag:''
    })
  },
  removeTag(e){
    let index = e.currentTarget.dataset.index;
    let tags = this.data.tags;
    tags.splice(index,1)
    this.setData({
      tags:tags
    })
  },
  create(e){
    let todos = wx.getStorageSync('todos')||[];
    if(!this.data.content){
      wx.showToast({ title: '请填写待办内容~', icon: 'none' });
      return;
    }
    let obj = {
      content:this.data.content,
      tags:this.data.tags,
      extra:this.data.extra
    }
    //console.log(obj);
    //console.log(todos)
    todos.push(obj);
    wx.setStorageSync('todos', todos);
    getApp().writeHistory(obj, 'create', +new Date());
    wx.navigateBack()
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