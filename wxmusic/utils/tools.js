let tools = {};

tools.querySearch = search => {
  if (!!search && typeof search == 'string') {
    let rstObj = {};
    /* 如果以？开头，说明是search，如果不以？开头，就从第一个问号开始隔断 */
    let searchArr = search[0] !== '?' ? search.substr(search.indexOf('?') + 1).split('&') : search.substr(1).split('&');
    searchArr.forEach((each, index) => {
      let item = each.split('=');
      if (each.indexOf('=') != -1) {
        rstObj[item[0].trim()] = item[1].trim();
      } else {
        console.error(`第${index + 1}项没有=,无法分割`);
      };
    });
    return rstObj;
  } else {
    console.error('传入的不是字符串');
    return undefined;
  };
};
tools.toQueryPair = (key, value) => {
  if (typeof value == 'undefined') {
    return key;
  }
  // return key + '=' + encodeURIComponent(value === null ? '' : String(value)); // 将value转化为encode格式
  return key + '=' + (value === null ? '' : String(value));
}
tools.toQueryString = (obj)=>{
  var ret = [];
  for (var key in obj) {
    // key = encodeURIComponent(key); // 将key转化为encode编码
    var values = obj[key];
    if (values && values.constructor == Array) {//数组
      var queryValues = [];
      for (var i = 0, len = values.length, value; i < len; i++) {
        value = values[i];
        queryValues.push(tools.toQueryPair(key, value));
      }
      ret = ret.concat(queryValues);
    } else { //字符串
      ret.push(tools.toQueryPair(key, values));
    }
  }
  return ret.join('&');
};
module.exports = tools;