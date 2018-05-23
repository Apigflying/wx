const { baseUrl } = require('../../utils/base.js');
const { request } = require('../../utils/fetch.js')
// 获取全局app中，
const { data: { innerAudioContext } } = getApp();
Component({
  data: {
    /* {url:".mp3", name: "默", picUrl: ".jpg", singer: "那英"}*/
    playSong: null, // 处理过的数据
    isPause: innerAudioContext.paused
  },
  ready() {
    if (!innerAudioContext.src) {
      console.log(123);
      this.palySong(31473269);

    }
  },
  methods: {
    changePlayState() {
      // 是否暂停状态
      this.data.isPause ? innerAudioContext.play() : innerAudioContext.pause();
      this.ctrlBtn();
    },
    // 通过isPause的状态来切换按钮的展示
    ctrlBtn() {
      let isPause = !this.data.isPause;
      this.setData({
        isPause
      })
    },
    //===============API===============\\
    // 通过歌曲的id获取歌曲的url，可以利用url播放音乐
    async palySong(songId) {
      let that = this;
      try {
        let { data: { data: songUrlList } } = await request(`${baseUrl}/music/url?id=${songId}`);
        let { data: { songs: songMesList } } = await request(`${baseUrl}/song/detail?ids=${songId}`);
        // console.log('歌曲信息', songMesList);
        // console.log('播放的url', songUrlList);
        if (songMesList.length && songUrlList) {
          let playSong = {
            url: songUrlList[0].url,// 歌曲的src，用于播放歌曲
            name: songMesList[0].name,// 歌名
            picUrl: songMesList[0].al.picUrl,// 歌曲图片地址
            singer: songMesList[0].ar.map(item => item.name).join('/') // 歌手名字
          };
          this.setData({
            playSong
          });
          // console.log(playSong);
          innerAudioContext.src = playSong.url;
        } else {
          console.log('歌曲不存在');
        }
      } catch (e) {
        console.error(e);
      }
    },
  }
})