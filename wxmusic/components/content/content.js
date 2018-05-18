// components/content/content.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    currentPage:{
      type:Number,
      value:0
    },
    router:{
      type:Array
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    scroll: true,
    selectedId: '11',
    list: [{
      id: '11',
      title: '第一页'
    }, {
      id: '21',
      title: '第二页'
    }, {
      id: '31',
      title: '第三页'
    }]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleTabChange(e) {
      console.log(e.detail);
    },
  }
})
