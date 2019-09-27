// pages/details/details.js
const db=wx.cloud.database()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title:"",
    titles:'',
    imgurl:'',
    user_tx:'',
    uname:""
  },
  // 功能收藏
  sc:function(){
    if(this.data.uname==""){
      wx.showModal({
        title: '提示',
        content: '亲爱的用户请先登录',
      })
      return
    }else{
      db.collection("collect").add({
        data:{
          title: this.data.title,
          titles: this.data.titles,
          imgurl: this.data.imgurl,
          user_tx: this.data.user_tx,
          uname: this.data.uname,
        }
      }).then(res=>{
        wx.showToast({
          title: '收藏成功',
        })
      }).catch(err=>{
        console.log(err)
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      title:options.tit,
      titles:options.tits,
      user_tx:options.u_tx,
      imgurl:options.imgs,
      uname:options.uname
    })
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