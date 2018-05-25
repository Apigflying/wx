const { request } = require('./utils/fetch.js');
//播放音乐的实例
const innerAudioContext = wx.createInnerAudioContext();
// let ctrlBtnApp = null;
// let isPlaying = !innerAudioContext.paused;
innerAudioContext.onPlay(() => {
  console.log('播放');
})
innerAudioContext.onPause(() => {
  console.log('暂停')
  // ctrlBtnApp(isPlaying)
})
innerAudioContext.onEnded(()=>{
  console.log('播放完了')
  // ctrlBtnApp(!isPlaying);
})


// console.log(app);
App({
  onLaunch() {
    // console.log('onLaunch');
    // console.log(this);
  },
  onShow() {
    console.log('onShow');
    this.palySong(22576669);
  },
  onHide() {
    console.log('onHide');
  },
  globalData: {
    innerAudioContext,
    playSong: null
  },
  changePlayState() {
    let isPlaying = !innerAudioContext.paused; // 是否正在播放
    if (isPlaying) {
      innerAudioContext.pause();
    } else {
      innerAudioContext.play();
    };
    return isPlaying;
  },
  // 通过歌曲的id获取歌曲的url，可以利用url播放音乐
  async palySong(songId) {
    try {
      let { data: { data: songUrlList } } = await request(`music/url?id=${songId}`);
      let { data: { songs: songMesList } } = await request(`song/detail?ids=${songId}`);
      // console.log('歌曲信息', songMesList);
      // console.log('播放的url', songUrlList);
      if (songMesList.length && songUrlList) {
        let playSong = {
          url: songUrlList[0].url,// 歌曲的src，用于播放歌曲
          name: songMesList[0].name,// 歌名
          picUrl: songMesList[0].al.picUrl,// 歌曲图片地址
          singer: songMesList[0].ar.map(item => item.name).join('/') // 歌手名字
        };
        /*
          虽然给playSong赋值了，但是
          在components/footer中，传递过去的playSong依旧是初始化时候的null。所以footer获取不到playSong，
          故在fotter的ready中获取当前app实例，此时的app.globalData.playSong已经被成功赋值

          总结：
            app根实例和component中间隔了一层page，向component中传递状态，需要在component的ready中调用getApp()获取已经加载数据后的globalData
        */
        this.globalData.playSong = playSong;
        innerAudioContext.src = playSong.url;      
      } else {
        console.log('歌曲不存在');
      }
    } catch (e) {
      console.error(e);
    }
  },
})