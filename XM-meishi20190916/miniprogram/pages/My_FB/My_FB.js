// pages/My_FB/My_FB.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    uname: "", //用户名
    images: [], //用户发布内容图片
    user_tx: "", //用户头像
    user_msg: [], //用户发布内容
    id: [], //当前用户发布内容的id
    idx: "" //页面中循环的下标
  },
  // 接收个人中心传入得数据
  detail: function(e) {
    var tit = e.currentTarget.dataset.tit
    var tits = e.currentTarget.dataset.tits
    var u_tx = e.currentTarget.dataset.u_tx
    var imgs = e.currentTarget.dataset.imgs
    wx.navigateTo({
      url: '/pages/details/details?tit=' + tit + '&tits=' + tits + "&u_tx=" + u_tx + "&imgs=" + imgs
    })
  },
  // 获取个人发布的信息
  get_FB: function() {
    wx.showLoading({
      title: '加载中',
    })
    db.collection("msg").where({
      uname: this.data.uname
    }).get().then(res => {
      // 将查询到的发布信息插入data的数组中，以便页面循环
      console.log(res.data[0]._id)
      for (var i = 0; i < res.data.length; i++) {
        this.data.images.push(res.data[i].imgurl[0])
        this.data.user_msg.push(res.data[i].user_msg)
        this.data.id.push(res.data[i]._id)
      }
      this.setData({
        user_tx: res.data[0].user_tx[0],
        uname: res.data[0].uname,
        images: this.data.images,
        user_msg: this.data.user_msg,
        id: this.data.id
      })
      wx.hideLoading()
    }).catch(err => {
      wx.hideLoading()
    })
  },
  // 删除发布按钮
  // 功能:点击按钮获取当前点击的内容id,通过id删除当前发布内容
  RE_content: function(e) {
    var idx = e.currentTarget.dataset.idx
    /*this.setData({
      idx:idx
    })*/
    var T = this
    wx.showModal({
      title: '提示',
      content: '是否删除这条已发布内容',
      success(res) {
        if (res.confirm) {
          console.log(T.data)
          db.collection("msg").doc(T.data.id[idx]).remove().then(res => {
            wx.showToast({
              title: '成功,请刷新',
            })
          }).catch(err => {
            console.log(err)
          })
        } else if (res.cancel) {
          wx.showToast({
            title: '取消操作',
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      uname: options.uname
    })
    this.get_FB()
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