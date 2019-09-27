// pages/publish/publish.js
const db=wx.cloud.database()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    uname:"",
    cname: "",
    content: '',
    images:"",
    user_tx:""
  },
  // 获取用户输入的菜名
  onChangeMnaem: function (e) {
    // 保存用户输入的菜品名称到data的cname
    this.setData({
      cname: e.detail
    })
  },
  // 获取用户输入的标题内容
  onChangeContent: function (e) {
    // 当用户输入内容时触发事件
    this.setData({
      content: e.detail
    })
  },
  // 上传菜品图片
  upload: function () {
    // 功能选择多张图片
    // #:将图片显示在images区域
    // 1在data添加images:[]
    // 2显示数据加载提示
    wx.showLoading({
      title: '上传中....',
    })
    setTimeout(function(){
      wx,wx.hideLoading()
    },2000)
    // 3选择多张图片
    wx.chooseImage({
      cont: 1,
      // 4：图片类型
      sizeType: ["original", "compressed"],
      // 5：图片来源
      sourceType: ["album", "camera"],
      // 6选择成功
      success: (res) => {
        // 7将选中图片保存
        var image = res.tempFilePaths
        this.setData({
          images: image
        })
        console.log(this.data.images)
        // 8异常加载提示框
        wx.hideLoading()
      },
    })
  },
  // 上传用户输入的数据并判断是否有空项
  updata:function(){
    if (this.data.cname== ""|| this.data.content==''||this.data.images== ""){
      wx.showModal({
        title: '提示',
        content: '请填入完整信息[图片、菜名、标题]',
      })
    }else{
      wx.showLoading({
        title: '上传中...',
      })
      // 上传数据到msg数据库
      db.collection("msg").add({
        data: {
          imgurl: this.data.images,//添加图片
          uname: this.data.uname,//用户姓名
          cname: this.data.cname,//菜名
          user_msg: this.data.content,//标题内容
          user_tx: this.data.user_tx //用户头像
        }
      }).then(res => {
        // 上传成功隐藏加载框
        wx.hideLoading()
        // 并跳转到笔记页面
        wx.reLaunch({
          url: '/pages/xm/note',
        })
      }).catch(err => {
        console.log(err)
      })
    }
  },
  user_tx_get:function(){
    db.collection("user_inof").where({
      uname: this.data.uname
    }).get().then(res => {
      console.log(res.data)
      this.setData({
        user_tx: res.data[0].user_tx
      })
    }).catch(err => { console.log(err) })
  },
  upcancle:function(){
    wx.showModal({
      title: '提示',
      content: '是否取消发布',
      success(res) {
        if (res.confirm) {
          wx.reLaunch({
            url: '/pages/xm/note',
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      uname:options.uname
    })
    this.user_tx_get()
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