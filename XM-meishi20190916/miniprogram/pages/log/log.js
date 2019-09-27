// pages/log/log.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    uname: '',//用户输入的用户名
    upwd: '',//用户输入的用户密码
    o: true,//登录按钮的禁用状态
    os: false,//注册按钮的禁用状态
    user_tx:["../../biji/tx/B010.jpg"]//用户传入的头像
  },
  // 这是单选框点击时修改o的状态,用o的状态来控制登录按钮的禁用状态
  check: function() {
    if (this.data.o == true) {
      this.setData({
        o: false
      })
    } else {
      this.setData({
        o: true
      })
    }
  },
  // 这是单选框点击时修改os的状态,用os的状态来控制注册按钮的禁用状态
  checks: function() {
    if (this.data.os == true) {
      this.setData({
        os: false
      })
    } else {
      this.setData({
        os: true
      })
    }
  },
  // 获取input中传入的用户名并判断格式
  unames: function(e) {
    // 用户名小于3
    if (e.detail.value.length < 3) {
      // 提示用户名不能小于三
      wx.showModal({
        title: '用户名不能小于3位',
        content: '',
      })
      return
    } else {
      // 否则设置data中的uname为用户输入的值
      this.setData({
        uname: e.detail.value
      })
    }
  },
  // 获取input中传入的用户密码并判断格式
  upwds: function(e) {
    // 如果用户密码小于六位
    if (e.detail.value.length < 6) {
      // 提示用户用户密码不能小于6位
      wx.showModal({
        title: '用户密码不能小于6位',
        content: '',
      })
      return
    } else {
      // 否则设置data中的upwd的值为用户输入的用户密码
      this.setData({
        upwd: e.detail.value
      })
    }
  },
  // 用户注册页面
  // 获取头像
  user_tx:function(){
    // 获取用户头像
      wx.chooseImage({
        cont: 1,
        // 4：图片类型
        sizeType: ["original", "compressed"],
        // 5：图片来源
        sourceType: ["album", "camera"],
        // 6选择成功
        success: (res) => {
          // 7将选中图片保存
          var tx = res.tempFilePaths
          console.log(tx)
          this.setData({
            user_tx: tx
          })
          // 8隐藏加载提示框
          wx.hideLoading()
        },
    })
  },
  // 注册
  user_reg: function() {
    // 判断用户输入的注册信息格式
    if (this.data.uname.length >= 3 && this.data.upwd.length >= 6) {
      // 格式正确时：用户输入的用户名查询数据库，判断返回的数据中是否包含有用户输入的用户名
      db.collection("user_inof").where({
        // 查询条件：用户输入的用户名去查询数据库
          uname: this.data.uname
      }).get().then(res => {
        console.log(res)
        // 如果没有
        if (res.data.length==0) {
          // 进行添加数据库操作
          console.log(this.data.user_tx)
          db.collection("user_inof").add({
            data: {
              uname: this.data.uname,
              upwd: this.data.upwd,
              user_tx:this.data.user_tx,
              user_login:1
            }
          }).then(res => {
            // 添加成功后提示注册成功并跳转个人中心
            wx.showToast({
              title: '注册成功',
            })
            wx.redirectTo({
              url: '/pages/publish/publish?uname='+this.data.uname
            })
          }).catch(err => {
            console.error
          })
        }else{
          // 如果有：提示用户名已存在
          wx.showModal({
            title: '提示',
            content: '用户名已存在',
          })
        }
      }).catch(err => {
        console.error(err)
      })
    } else {
      // 格式错误提示
      wx.showModal({
        title: '提示',
        content: '用户名不能小于3位,密码不能少于6位',
      })
    }
  },
  // 用户登录
  user_login: function() {
    // 查询数据库
    db.collection("user_inof").where({
      uname: this.data.uname
    }).get().then(res => {
      if (res.data[0] == undefined) {
        wx.showModal({
          title: '提示',
          content: '用户名或密码错误',
        })
      } else if (res.data[0].uname != this.data.uname || res.data[0].upwd != this.data.upwd) {
        wx.showModal({
          title: '提示',
          content: '用户名或密码错误',
        })
      } else if (res.data[0].uname == this.data.uname && res.data[0].upwd == this.data.upwd){
        db.collection("user_inof").doc(res.data[0]._id).update({
          data:{
            user_login:1
          }
        }).then(res=>{console.log(res)}).catch(err=>{console.log(err)})
        wx.showToast({
          title: '登陆成功',
        })
        wx.redirectTo({
          url: '/pages/publish/publish?uname=' + this.data.uname
        })
      }
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