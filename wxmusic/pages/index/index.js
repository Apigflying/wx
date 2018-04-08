//index.js
//获取应用实例
const app = getApp();
// const { request } = require("../../utils/fetch.js");

Page({
  data: {
    motto: "Hellold",
    currentSong: null
  },
  // -----------------------事件处理函数-----------------------
  bindViewTap: function() {
    wx.reLaunch({
      url: "../logs/logs"
    });
  },
  changeGlobalNum() {
    app.globalData.num++;
  },
  async testClick() {
    let data = await wx.request({
      url:
        "http://localhost:3000/search?keywords=%E6%B5%B7%E9%98%94%E5%A4%A9%E7%A9%BA",
      method: "GET", // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      success: function(res) {
        console.log(res);
      }
    })();
    this.setData({
      motto: data
    });
  },
  sleep() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("1234");
      }, 2000);
    });
  },
  parentEvents(val) {
    console.log(val);
    this.setData({
      motto: val
    });
  },
  getUserInfo: function(e) {
    console.log(e);
    app.globalData.userInfo = e.detail.userInfo;
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    });
  },
  //-----------------------钩子函数-----------------------
  onLoad() {}
});
