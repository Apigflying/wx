const { toQueryString } = require('../../../utils/tools.js');
const { request } = require('../../../utils/fetch.js');

Component({
  properties: {

  },
  data: {
    // tab切换
    selectedId: 'tj',
    tabList: [{
      id: 'tj',
      title: '推荐'
    }, {
      id: 'py',
      title: '朋友'
    }, {
      id: 'dt',
      title: '电台'
    }],
    // banner swiper轮播图组件
    swiper: {
      swiperList: [],
      current: 0, // 当前展示的
      autoplay: true,// 是否自动轮播
      circular: true, // 是否采用衔接滑动
      idots: true, // 是否展示面板指示点
      dotColor: 'rgba(255,255,255,0.4)',// 面板指示点默认颜色
      dotActiveColor: 'rgba(229,71,60,0.8)' // 面板指示点选中的颜色
    },
    tjpersonalized:[],// 推荐歌单
  },
  // 钩子函数
  ready() {
    // 获取推荐的banner
    this.getBanners();
    // 获取推荐歌单
    this.getTjPersonalized();
  },
  methods: {
    //========事件========\\
    // 点击图片事件
    toThePage(e){
      let id = e.currentTarget.dataset.item;
      let tjpersonalized = this.data.tjpersonalized;
      let songItem = tjpersonalized.find(item=>item.id===id);
      console.log(songItem)
      let songItemString = toQueryString(songItem);
      // console.log(songItemString);
      wx.navigateTo({
        url: `/pages/detail/detail?${songItemString}`,
      })
    },
    // 二级导航切换事件
    tabChange(e) {
      let selectedId = e.detail;
      this.setData({
        selectedId
      });
    },
    //========API=========\\
    async getBanners() {// 获取中间的banner
      try{
        let { data: { banners } } = await request('banner');
        let { swiper } = this.data;
        swiper.swiperList = banners;
        this.setData({
          swiper
        });
      }catch(e){
        console.error(e);
      }
    },
    async getTjPersonalized(){// 获取推荐歌单
      try{
        let { data: { result } } = await request('personalized');
        let { tjpersonalized } = this.data;
        // tjpersonalized = result;
        tjpersonalized = result.slice(0, 6);// 只保留前6个
        console.log(tjpersonalized);
        this.setData({
          tjpersonalized
        });
      }catch(e){
        console.error(e);
      }
    }
  }
})
