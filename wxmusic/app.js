//播放音乐的实例
const innerAudioContext = wx.createInnerAudioContext();
innerAudioContext.onPlay(() => {
  console.log('开始播放')
})
innerAudioContext.onError((res) => {
  console.log(res.errMsg)
  console.log(res.errCode)
})

App({
  onShow() {

  },
  onHide() {

  },
  data: {
    innerAudioContext
  }
})