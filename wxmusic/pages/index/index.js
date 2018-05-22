Page({
  data: {
    currentRoute:1,
    isSettingShow:false
  },
  // 设置展示的页面
  setRoute(e){
    let currentRoute = e.detail;
    let oldRoute = this.data.currentRoute;
    if (oldRoute === currentRoute){
      return false;
    };
    this.setData(Object.assign(this.data, {
      currentRoute
    }));
  },
  // 关闭设置的弹层
  closeSetting(){
    this.setData({
      isSettingShow:false
    })
  },
  // 显示设置的弹层
  showSetting(){
    this.setData({
      isSettingShow: true
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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