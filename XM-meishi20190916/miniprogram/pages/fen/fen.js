// pages/fen/fen.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lists: [{
        id: 1,
        img: ("/shang/01.jpg"),
        guo: "果肉金黄，清甜多汁",
        diu: "归田局 | 云南香龙虾",
        price: 38.99
      },
      {
        id: 2,
        img: ("/shang/02.jpeg"),
        guo: "果肉金黄，清甜多汁2",
        diu: "归田局 | 鸡肉蘑菇汤",
        price: 20.99
      },
      {
        id: 3,
        img: ("/shang/03.jpg"),
        guo: "果肉金黄，清甜多汁3",
        diu: "归田局 | 甜心大饼",
        price: 18.99
      },
      {
        id: 4,
        img: ("/shang/04.jpg"),
        guo: "果肉金黄，清甜多汁4",
        diu: "归田局 | 束城面饼",
        price: 17.99
      },
      {
        id: 5,
        img: ("/shang/05.jpg"),
        guo: "果肉金黄，清甜多汁5",
        diu: "归田局 | 黄油小丸子",
        price: 28.99
      },
      {
        id: 6,
        img: ("/shang/06.jpg"),
        guo: "果肉金黄，清甜多汁6",
        diu: "归田局 | 肉肉鸡块",
        price: 18.99
      },
      {
        id: 7,
        img: ("/shang/07.jpg"),
        guo: "果肉金黄，清甜多汁7",
        diu: "归田局 | 起名花",
        price: 28.99
      },
      {
        id: 8,
        img: ("/shang/08.jpg"),
        guo: "果肉金黄，清甜多汁8",
        diu: "归田局 | 好吃高去",
        price: 19.99
      },
      {
        id: 9,
        img: ("/shang/09.jpg"),
        guo: "果肉金黄，清甜多汁9",
        diu: "归田局 | 土豆花生",
        price: 22.99
      },
      {
        id: 10,
        img: ("/shang/010.jpg"),
        guo: "果肉金黄，清甜多汁9",
        diu: "归田局 | 又是糖糕）",
        price: 26.99
      },
      {
        id: 11,
        img: ("/shang/011.jpg"),
        guo: "果肉金黄，清甜多汁",
        diu: "归田局 | 酸爽猪皮",
        price: 36.99
      },
      {
        id: 12,
        img: ("/shang/012.jpg"),
        guo: "果肉金黄，清甜多汁",
        diu: "归田局 | 切糕",
        price: 55.99
      },
      {
        id: 13,
        img: ("/shang/013.jpg"),
        guo: "果肉金黄，清甜多汁",
        diu: "归田局 | 清香面",
        price: 77.99
      },
      {
        id: 14,
        img: ("/shang/014.jpeg"),
        guo: "果肉金黄，清甜多汁",
        diu: "归田局 | 火腿加。。",
        price: 66.99
      },
      {
        id: 15,
        img: ("/shang/015.jpg"),
        guo: "果肉金黄，清甜多汁",
        diu: "归田局 | 面包",
        price: 44.99
      },
      {
        id: 16,
        img: ("/shang/016.jpg"),
        guo: "果肉金黄，清甜多汁",
        diu: "归田局 | 丸子",
        price: 33.99
      },
      {
        id: 17,
        img: ("/shang/017.jpg"),
        guo: "果肉金黄，清甜多汁",
        diu: "归田局 | 混料大礼包",
        price: 55.99
      },
      {
        id: 18,
        img: ("/shang/018.jpeg"),
        guo: "果肉金黄，清甜多汁",
        diu: "归田局 | 狗脊煮粥",
        price: 99.99
      },
      {
        id: 19,
        img: ("/shang/019.jpeg"),
        guo: "果肉金黄，清甜多汁",
        diu: "归田局 | 爱心拼盘",
        price: 44.99
      },
      {
        id: 20,
        img: ("/shang/020.jpg"),
        guo: "果肉金黄，清甜多汁",
        diu: "归田局 | 结束汤",
        price: 22.99
      },
    ]
  },
  shang: function(event) {
    var price = event
    console.log(price)
    // wx.navigateTo({
    //   url: '/pages/shang/shang?id=' + price
    // })
  },

  change1: function(event) {
    // 功能：点击减号数量减1
    // (1)获取到数组中每个对象
    var price = event.target.dataset.id.price; 
    var img=event.target.dataset.id.img;
    var guo = event.target.dataset.id.guo
    console.log(guo)
    var diu = event.target.dataset.id.diu
    console.log(diu)
    console.log(img);
    console.log(price);
    wx.navigateTo({
      url: '/pages/shang/shang?id=' + price + '&guo=' + guo + "&diu=" + diu + "&img=" + img
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