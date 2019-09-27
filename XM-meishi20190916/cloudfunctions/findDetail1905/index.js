// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口文件
//1：引入request-promise库
const rp = require("request-promise");
//2:创建url
exports.main = async (event, context) => {
  var url = `http://api.douban.com/v2/movie/subject/`;
  url += `${event.id}`;
  url += `?apikey=0df993c66c0c636e29ecbb5344252a4a`;
  //3:发动ajax  小心两个return
  return rp(url).then(res => {
    return res;
  }).catch(err => {
    console.log(err);
  })

}





// // 云函数入口函数
// exports.main = async (event, context) => {
//   const wxContext = cloud.getWXContext()

//   return {
//     event,
//     openid: wxContext.OPENID,
//     appid: wxContext.APPID,
//     unionid: wxContext.UNIONID,
//   }
// }




// exports.main = async (event, context) => {
//   const wxContext = cloud.getWXContext()

//   return {
//     event,
//     openid: wxContext.OPENID,
//     appid: wxContext.APPID,
//     unionid: wxContext.UNIONID,
//   }
// }