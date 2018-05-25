
Component({
  properties: {
    currentRoute: {
      type: Number,
      value: 0,
      observer(index,oldVal){
        let headNav = this.data.headNav;
        wx.setNavigationBarTitle({
          title: headNav[index].title
        })
      }
    }
  },
  // 组件的内部数据，和 properties 一同用于组件的模版渲染
  data: {
    headNav: [{
      icon: '../../static/attention-unselect.png',
      slelectIcon: '../../static/attention-select.png',//1
      title:'本地音乐'
    }, {
      icon: '../../static/local-music-unselect.png',//2
      slelectIcon: '../../static/local-music-select.png',//1
      title: '音乐库'
    }, {
      icon: '../../static/music-library-unselect.png',
      slelectIcon: '../../static/music-library-select.png',//1
      title: '推荐'
    }]
  },
  // 组件的方法，包括事件响应函数和任意的自定义方法
  methods: {
    navChange(e) {
      let index = Number(e.currentTarget.id);
      this.triggerEvent('setRoute', index);
    },
    showSetting() {
      this.triggerEvent('showSetting')
    }, 
    toSearch() {
      // wx.redirectTo({
      //   url: '../../pages/search/search'
      // })
      wx.navigateTo({
        url: `/pages/search/search`,
      })
    }
  }
})