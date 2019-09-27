// pages/vip/vip.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      '/images/vip01.jpg',
      '/images/vip02.jpg',
      '/images/vip03.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 500,
    vip: [{
      id: 1,
      img: ("../../images/vip1.jpg"),
    }, {
      id: 2,
      img: ("../../images/vip2.jpg"),
    }, {
      id: 3,
      img: ("../../images/vip3.jpg"),
    }, {
      id: 4,
      img: ("../../images/vip4.jpg"),
    }, {
      id: 5,
      img: ("../../images/vip5.jpg"),
    }, {
      id: 6,
      img: ("../../images/vip6.jpg"),
    }]
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