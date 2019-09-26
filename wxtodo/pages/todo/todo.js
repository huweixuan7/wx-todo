// pages/todo/todo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    todos:[],
    numNofinished:0,
    content:'',
    leftStr:''
  },
  //事件处理函数
  toDetail(){
    wx.navigateTo({
      url: '/pages/detail/detail',
    })
  },

  //事件函数，
  quickAdd(e){
    let content = e.detail.value.trim()
    if(!content){return}
    let obj = {
      content:content
    }
    let todos = this.data.todos;
    todos.push(obj);
    this.setData({
      todos,
      numNofinished: this.data.numNofinished+1,
      content:''
    })
    wx.setStorageSync('todos', todos);
    getApp().writeHistory(obj, 'create', +new Date());
  },
   //清空所有完成
  clearAll(e){
    let todos = this.data.todos;
    todos = todos.filter(function(item){
      return item.finished!=true
    })
    wx.setStorageSync('todos', todos);
    this.setData({
      todos
    })
    getApp().writeHistory(null, 'clear', +new Date());
  },
  //设置所有都完成
  allFinished(e){
    let todos = this.data.todos;
    let newtodos = todos.filter(function(item){
      return item.finished!=true
    })
    if(newtodos.length){
      todos.forEach(function (item, index) {
        item.finished = true;
      })
      getApp().writeHistory(null, 'finishAll', +new Date());
      this.setData({
        leftStr: '全部重启',
        numNofinished: 0
      })
    }else{
      todos.forEach(function (item, index) {
        item.finished = false;
      })
      getApp().writeHistory(null, 'restartAll', +new Date());
      this.setData({
        leftStr:'全部完成',
        numNofinished: this.data.todos.length
      })
    }
    
    wx.setStorageSync('todos',todos);
    this.setData({
      todos
    })
    
  },

  toggleFinished(e){
    //console.log(e.currentTarget.dataset.index)
    let index = e.currentTarget.dataset.index;
    let todos = this.data.todos;
    let numNofinished = this.data.numNofinished;
    todos[index].finished = !todos[index].finished;
    let name = todos[index].finished ? "finish" : "restart"
    this.setData({
      todos,
      numNofinished: todos[index].finished ? numNofinished - 1 : numNofinished+1
    })
    wx.setStorageSync("todos",todos);
    getApp().writeHistory(todos[index], name, +new Date());
  },

//删除操作
  itemRemove(e){
    let index = e.currentTarget.dataset.index;
    let todos = this.data.todos;
    getApp().writeHistory(todos[index], "delete", +new Date());
    todos.splice(index,1);
    wx.setStorageSync("todos", todos);
    this.setData({
      todos
    })
  },

  //自定义函数
  init(){
    //  从本地存储中提取所有待办事项
    let todos = wx.getStorageSync('todos') || [];
    //遍历，算出未完成事项
    let num = 0;
    todos.forEach(function (item, index) {
      if (!item.finished) {
        num = num + 1;
      }
    })
    
    this.setData({
      todos: todos,
      numNofinished: num,
      leftStr:num ? "全部完成" : "全部重启"
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.init()
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
    this.init()
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