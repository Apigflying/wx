// components/main/library/library.js
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
      autoplay: false,// 是否自动轮播
      circular: true, // 是否采用衔接滑动
      idots: true, // 是否展示面板指示点
      dotColor: 'rgba(255,255,255,0.4)',// 面板指示点默认颜色
      dotActiveColor: 'rgba(229,71,60,0.8)' // 面板指示点选中的颜色
    },

  },
  methods: {
    tabChange(e) {
      let selectedId = e.detail;
      this.setData({
        selectedId
      });
    },
    
  }
})
