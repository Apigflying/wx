
Component({
  properties:{
    currentRoute:{
      type:Number,
      value:0
    }
  },
  // 组件的内部数据，和 properties 一同用于组件的模版渲染
  data:{
    headNav:[{
      icon:'../../static/music-library-unselect.png',
      slelectIcon:'../../static/music-library-select.png',//1
    },{
      icon:'../../static/local-music-unselect.png',//2
      slelectIcon:'../../static/local-music-select.png',//1
    },{
      icon:'../../static/attention-unselect.png',
      slelectIcon:'../../static/attention-select.png',//1
    }]
  },
  // 组件的方法，包括事件响应函数和任意的自定义方法
  methods:{
    navChange(e){
      let index = Number(e.currentTarget.id);
      let url = '';
      if (index === 0) {
        url = '/pages/musiclocal/musiclocal'
      } else if (index === 1) {
        url = '/pages/musiclibrary/musiclibrary'
      } else {
        url = '/pages/musicattention/musicattention'
      }
      wx.redirectTo({
        url
      })
    }
  }
})