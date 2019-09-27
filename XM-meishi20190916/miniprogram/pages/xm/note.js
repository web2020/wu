// pages/xm/note.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgurl: ["/biji/1.jpg", "/biji/3.jpg", "/biji/4.jpeg", "/biji/5.jpg", "/biji/6.jpeg", "/biji/7.jpeg", "/biji/8.jpg", "/biji/9.jpg", "/biji/10.jpeg", "/biji/11.jpg", "/biji/12.jpeg", "/biji/13.jpg", "/biji/14.jpg", "/biji/15.jpg", "/biji/16.jpg", "/biji/17.jpg", "/biji/18.jpg", "/biji/2.jpg"],
    title: ["用户1", "用户2", "用户3", "用户4", "用户5", "用户6", "用户7", "用户8", "用户9", "用户10", "用户11", "用户12", "用户13", "用户14", "用户15", "用户16", "用户17", "用户18"], //保存笔记标题
    titles: ["美食与你皆不可错过", "美食与你皆不可错过", "美食与你皆不可错过", "美食与你皆不可错过", "美食与你皆不可错过", "美食与你皆不可错过", "美食与你皆不可错过", "美食与你皆不可错过", "美食与你皆不可错过", "美食与你皆不可错过", "美食与你皆不可错过", "美食与你皆不可错过", "美食与你皆不可错过", "美食与你皆不可错过", "美食与你皆不可错过", "美食与你皆不可错过", "美食与你皆不可错过", "美食与你皆不可错过"], //保存笔记内容
    user_tx: ["/biji/tx/B001.jpg", "/biji/tx/B002.jpg", "/biji/tx/B003.jpg", "/biji/tx/B004.jpg", "/biji/tx/B005.jpg", "/biji/tx/B006.jpg", "/biji/tx/B007.jpg", "/biji/tx/B008.png", "/biji/tx/B009.jpg", "/biji/tx/B010.jpg", "/biji/tx/B011.jpg", "/biji/tx/B012.jpg", "/biji/tx/B013.jpg", "/biji/tx/B014.jpg", "/biji/tx/B015.jpg", "/biji/tx/B016.jpg", "/biji/tx/B017.jpg", "/biji/tx/B018.jpg"],
    login: 0,
    uname: ""
  },
  // 跳转到详情页面时获取当前点击的页面数据，并带着数据跳转到详情页
  details: function(e) {
    var tit = e.currentTarget.dataset.tit
    var tits = e.currentTarget.dataset.tits
    var u_tx = e.currentTarget.dataset.u_tx
    var imgs = e.currentTarget.dataset.imgs
    wx.navigateTo({
      url: '/pages/details/details?tit=' + tit + '&tits=' + tits + "&u_tx=" + u_tx + "&imgs=" + imgs + "&uname=" + this.data.uname
    })
  },

  // 发布按钮:功能 判断用户是否登录
  FB_container: function() {
    // 1：判断data中的login是否为1
    // 2：如果为1那就直接跳到发布页面并将用户名传入发布页面
    if (this.data.login == 1) {
      wx.redirectTo({
        url: '/pages/publish/publish?uname=' + this.data.uname
      })
      // 否则跳转到登录注册页面
    } else {
      wx.navigateTo({
        url: '/pages/log/log'
      })
    }
  },
  // 页面显示时查询数据库
  get_user: function() {
    db.collection("user_inof").where({
      user_login: 1
    }).get().then(res => {
      // 2：查询成功后
      // 如果查询带登录状态为1的
      if (res.data[0].user_login == 1) {
        //设置data中的login为1，用于判断用户是否登录
        this.setData({
          login: 1,
          uname: res.data[0].uname
        })
      }
      // 如果没有查到
    }).catch(err => {
      this.setData({
        login:0
      })
    })
  },
  // 页面首次加载查询数据库中的发布信息并显示到页面中
  user_get: function() {
    // 查询msg数据库所有数据
    db.collection("msg").get().then(res => {
      // 循环查询到的数据
      for (var i = 0; i < res.data.length; i++) {
        // 将查询到的数据插入到data中去
        this.data.imgurl.push(res.data[i].imgurl[0])
        this.data.title.push(res.data[i].uname)
        this.data.titles.push(res.data[i].user_msg)
        this.data.user_tx.push(res.data[i].user_tx[0])
      }
      this.setData({
        imgurl: this.data.imgurl,
        title: this.data.title,
        titles: this.data.titles,
        user_tx: this.data.user_tx
      })
    }).catch(err => {
      console.error
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
   
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.user_get()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.get_user() //查询用户登录状态
    console.log(1)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})