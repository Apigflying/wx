
Component({
  properties:{
    valFromParent:{
      type:Object,//该字段的类型
      value:{a:2},//这里是这个字段的默认初始值
      observer:(newVal,oldVal)=>{
        console.log(newVal,oldVal);
      }
    }
  },
  // 组件的内部数据，和 properties 一同用于组件的模版渲染
  data:{
    currentRoute:0,
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
      this.triggerEvent('setPage', index);
      this.setData({
        currentRoute:index
      });
    }
  }
})