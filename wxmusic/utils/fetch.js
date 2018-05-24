const { baseUrl } = require('base.js');
const request = (realUrl, option = {}) => {
  let url = `${baseUrl}/${realUrl}`;
  let options = Object.assign({
    data:'',
    header: {},
    method: 'GET',
    dataType: 'json',
    responseType: 'text',
  }, option);
  return new Promise((resolve, reject) => {
    wx.request({
      url,
      ...options,
      success(res) {
        resolve(res);
      },
      fail(err) {
        reject(err);
      }
    })
  });
};
module.exports = {
  request
}