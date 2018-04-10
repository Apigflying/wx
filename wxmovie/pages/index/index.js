//index.js
// const {baseUrl} = require('../../common/config/index.js').default;
import config from '../../common/config/index.js';
const { baseUrl } = config;
Page({
  data: {
    movies: [],
    page: 1,
    size: 10
  },
  onLoad() {
    this.getMovies()
  },
  getMovies() {
    let { page, size, movies } = this.data;
    wx.request({
      url: `${baseUrl}/list?page=${page}&size=${size}`,
      success: ({ data: { data: list } }) => {
        // 对数据源进行格式化
        list = list.map(item => Object.assign(item, {
          title: item.title.split('/')[0],
          rate: item.rate.toFixed(1),
          types: item.types.join('·')
        }))
        // 循环渲染列表
        for (let i = 0; i < list.length; i += 2) {
          movies.push([list[i], list[i + 1] ? list[i + 1] : null])
        }
        this.setData({
          movies
        })
      }
    })
  },
  scrolltolower(){
    let {page} = this.data;
    this.setData({
      page:++page
    })
    console.log(this.data.page)
    this.getMovies();
  }
})
