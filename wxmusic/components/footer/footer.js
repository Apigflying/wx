Component({
  data: {
    /* {url:".mp3", name: "默", picUrl: ".jpg", singer: "那英"}*/
    playSong: null, // 处理过的数据
    isPause: true,
    app: null
  },
  ready() {
    this.data.app = getApp();
    // 在切换不同page页面时，同步app内的状态
    let { innerAudioContext, playSong } = this.data.app.globalData;
    // console.log(innerAudioContext.paused, playSong)
    this.setData({
      playSong, isPause: innerAudioContext.paused
    });
  },
  methods: {
    changePlayState() {
      const { changePlayState } = this.data.app;
      const isPause = changePlayState();
      // console.log(isPause);
      this.setData({
        isPause
      })
    }
    //===============API===============\\

  }
})