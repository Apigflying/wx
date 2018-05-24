const { baseUrl } = require('../../utils/base.js');
const { request } = require('../../utils/fetch.js');

// 获取全局app中，

Component({
  data: {
    /* {url:".mp3", name: "默", picUrl: ".jpg", singer: "那英"}*/
    playSong:null, // 处理过的数据
    isPause: true
  },
  ready() {
    // 同步app内的状态
    const app = getApp();
    let { globalData: { innerAudioContext, playSong } } = app;
      this.setData({
        playSong, isPause: innerAudioContext.paused
      })
  },
  methods: {
    changePlayState() {
      const app = getApp();
      if (!app.globalData.playSong){
        return wx.showToast({
          title:'没有歌曲',
          icon:'loading'
        })
      };
      // ctrlBtn内的this指向
      app.changePlayState(this.ctrlBtn.bind(this));
    },
    // 通过isPause的状态来切换按钮的展示
    ctrlBtn() {
      let isPause = !this.data.isPause;
      this.setData({
        isPause
      })
    },
    //===============API===============\\
    
  }
})