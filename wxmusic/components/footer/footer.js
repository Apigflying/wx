const { baseUrl } = require('../../utils/base.js');
// 获取全局app中，
const { data: { innerAudioContext } } = getApp();
Component({
  data: {
    playSong: null,
    isPause: innerAudioContext.paused,
    headNav: [{
      icon: '../../static/音乐.png'
    }, {
      icon: '../../static/用户.png'
    }]
  },
  ready() {
    this.palySong(108914);
    this.getSongDetail(108914);
  },
  methods: {
    changePlayState() {
      // 是否暂停状态
      this.data.isPause ? innerAudioContext.play() : innerAudioContext.pause();
      this.ctrlBtn();
    },
    // 通过isPause的状态来切换按钮的展示
    ctrlBtn(){
      let isPause = !this.data.isPause;
      this.setData({
        isPause
      })
    },
    //===============API===============\\
    // 通过歌曲的id获取歌曲的url，可以利用url播放音乐
    palySong(songId) {
      let that = this;
      wx.request({
        url: `${baseUrl}/music/url?id=${songId}`,
        success(res) {
          let { data } = res;
          let playSong = data.data[0];
          that.setData({
            playSong
          });
          console.log(playSong);
          if (playSong) {
            innerAudioContext.src = playSong.url;
          }
        },
      })
    },
    getSongDetail(songId){
      const that = this;
      wx.request({
        url: `${baseUrl}/song/detail?ids=${songId}`,
        success(res){
          console.log(res);
        }
      })
    }
  }
})