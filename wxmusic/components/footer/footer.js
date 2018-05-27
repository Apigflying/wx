Component({
  data: {
    /* {url:".mp3", name: "默", picUrl: ".jpg", singer: "那英"}*/
    playSong: null, // 处理过的数据
    isPause: true
  },
  ready() {
    let app = getApp();
    app.globalData.footer = this;
    this.data.app = app;
    // 在切换不同page页面时，同步app内的状态
    let { innerAudioContext, playSong,footer } = this.data.app.globalData;
    // console.log(innerAudioContext.paused, playSong)
    this.setData({
      playSong, isPause: innerAudioContext.paused
    });
    console.log(footer);
  },
  methods: {
    changePlayState() {
      this.data.app.changePlayState();
    },
    changeBtn(isPause){
      console.log(isPause)
      this.setData({
        isPause
      })
    }
    //===============API===============\\

  }
})