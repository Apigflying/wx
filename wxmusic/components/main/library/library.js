const { baseUrl } = require('../../../utils/base.js');
console.log(baseUrl);
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
      console.log(e);
    },
    // 二级导航切换事件
    tabChange(e) {
      let selectedId = e.detail;
      this.setData({
        selectedId
      });
    },
    //========API=========\\
    getBanners() {// 获取中间的banner
      let that = this;
      wx.request({
        url: `${baseUrl}/banner`,
        success(res){
          let { data: { banners } } = res;
          let {swiper} = that.data;
          swiper.swiperList = banners;
          that.setData({
            swiper
          });
        }
      })
    },
    getTjPersonalized(){// 获取推荐歌单
      let that = this;
      wx.request({
        url: `${baseUrl}/personalized`,
        success:(res)=>{
          let {data:{result}} = res;
          let { tjpersonalized } = that.data;
          tjpersonalized = result.slice(0,6);// 只保留前6个
          that.setData({
            tjpersonalized
          });
        }
      })
    }
  }
})
