
Component({
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
  methods:{
    navChange(e){
      let index = Number(e.currentTarget.id);
      console.log(index)
      console.log(this.data.headNav[index])
      this.setData({
        currentRoute:index
      })
      // wx.redirectTo()
    }
  }
})