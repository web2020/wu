// pages/My_SC/My_SC.js
const db=wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    uname:"", //当前登录的用户名
    title:[], //收藏内容的用户名
    titles:[],//收藏的标题
    user_tx:[],//收藏的用户头像
    images:[],//收藏的用户发布的图片
    id:[]//保存数据库中查询到的数据 
  },
  // 功能:取消收藏
  RE_collect:function(e){
    // 获取页面中选中的收藏项下标
    var idx=e.currentTarget.dataset.idx
    // 回调函数外定义this
    var T=this
    wx.showModal({
      title: '提示',
      content: '是否取消收藏',
      success(res){
        if(res.confirm){
          db.collection("collect").doc(T.data.id[idx]).remove().then(res => {
            wx.showToast({
              title: '完成，请刷新',
            })
          }).catch(err=>{
            wx.showToast({
              title:"用户取消操作"
            })
          })
        }else if(res.cancel){
          wx.showToast({
            title: '用户取消操作',
          })
        }
      }
    })
  },
  // 功能跳转到详情页面
    detail: function(e) {
      var tit = e.currentTarget.dataset.tit
      var tits = e.currentTarget.dataset.tits
      var u_tx = e.currentTarget.dataset.u_tx
      var imgs = e.currentTarget.dataset.imgs
      wx.navigateTo({
        url: '/pages/details/details?tit=' + tit + '&tits=' + tits + "&u_tx=" + u_tx + "&imgs=" + imgs
      })
    },
  // 功能查询collect数据库获取用户收藏信息
  get_SC:function(){
    wx.showLoading({
      title: '加载中',
    })
    db.collection("collect").where({
      uname:this.data.uname
    }).get().then(res=>{
      for(var i=0;i<res.data.length;i++){
        this.data.title.push(res.data[i].title) //收藏内容的用户名
        this.data.titles.push(res.data[i].titles)//收藏的标题
        this.data.user_tx.push(res.data[i].user_tx)//收藏的用户头像
        this.data.images.push(res.data[i].imgurl) //收藏的用户发布的图片
        this.data.id.push(res.data[i]._id)
      }
      this.setData({
        title: this.data.title,
        titles: this.data.titles,
        user_tx:this.data.user_tx,
        images:this.data.images,
        id:this.data.id
      })
      wx.hideLoading()
    }).catch(err=>{
      wx.hideLoading()
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      uname:options.uname
    })
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.get_SC()
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