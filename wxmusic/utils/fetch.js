const request = (url) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url,
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