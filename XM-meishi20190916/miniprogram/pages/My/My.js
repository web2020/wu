// pages/My/My.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user_tx: "",
    uname: "",
    btn_inner: ""
  },
  cat:function(){
    if (this.data.uname == "请登录") {
      wx.showModal({
        title: '亲爱的用户，请先登录',
        content: '',
      })
      return
    } else {
      // 否则就跳到My_FB页面
      console.log(this.data.uname)
      wx.navigateTo({
        url: '/pages/gowuc/gowuc?uname=' + this.data.uname
      })
    }
  },
  // 根据页面的uname中的值来判断这次点击触发事件的作用
  // 跳转到我的发布页面
  SC_content:function(){
    if (this.data.uname == "请登录") {
      wx.showModal({
        title: '亲爱的用户，请先登录',
        content: '',
      })
      return
    } else {
      // 否则就跳到My_FB页面
      console.log(this.data.uname)
      wx.navigateTo({
        url: '/pages/My_SC/My_SC?uname=' + this.data.uname
      })
    }
  },
  FB_content: function() {
    // 如果内容为"请登录"就提示用户请先登录
    if (this.data.uname == "请登录") {
      wx.showModal({
        title: '亲爱的用户，请先登录',
        content: '',
      })
      return
    } else {
      // 否则就跳到My_FB页面
      wx.navigateTo({
        url: '/pages/My_FB/My_FB?uname='+this.data.uname
      })
    }
  },
  // 功能:判断用户是否在笔记页面登录过
  log: function() {
    // 查询数据库里用户的登录状态是否为1
    db.collection("user_inof").where({
      user_login: 1
    }).get().then(res => {
      // 如果登录状态为1
      if (res.data[0].user_login == 1) {
        // 设置data中在页面显示的内容
        this.setData({
          user_tx: res.data[0].user_tx,
          uname: res.data[0].uname,
          btn_inner: "退出登录"
        })
      }
    }).catch(err => {
      // 如果查询结果为空设置data中的内容为未登录状态的内容
      this.setData({
        btn_inner: "登陆",
        uname: "请登录",
        user_tx: "../../biji/tx/user_log.jpg"
      })
    })
  },
  // 判断按钮文字决定按钮的用途
  login_out: function() {
    if (this.data.btn_inner == "退出登录") {
      // 首先查询数据库,查找当前登录用户
      db.collection("user_inof").where({
        uname: this.data.uname
      }).get().then(res => {
        //  查询成功时获取当前用户的_id，对用户的登录状态进行修改
        db.collection("user_inof").doc(res.data[0]._id).update({
          data: {
            user_login: 0
          }
        }).then(res => {
          wx.showToast({
            title: '已退出登录',
          })
          //  修改成功后修改页面样式为未登录状态的样式
          this.setData({
            uname: "请登录",
            user_tx: "/biji/tx/user_log.jpg",
            btn_inner: "登录"
          })
        })
      })
    } else {
      // 如果按钮内容不等于退出登录,就跳转到登录页面
      wx.navigateTo({
        url: '/pages/My_log/My_log',
      })
    }
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

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.log()
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