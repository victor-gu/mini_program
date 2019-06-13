import Fly from 'flyio/dist/npm/wx'

const request = new Fly()

request.interceptors.request.use((request) => {
  wx.showLoading({
    title: '加载中',
    mask: true
  });
  request.headers = {
    'Authorization': 'b528988ee7034aaf87e230df8e35c25f',
    'content-type': 'application/json'
  };
  return request
})

request.interceptors.response.use(
  (response, promise) => {
    wx.hideLoading();
    if (err.message === 'request:fail timeout') {
      wx.showModal({
        title: '提示',
        content: '网络超时,请稍后重试！',
        showCancel: false
      })
    }
    return promise.resolve(response.data);
  },
  (err, promise) => {
    wx.hideLoading();
    return promise.reject(err);
  }
)
// const baseURL = mpvuePlatform === 'h5' ? '/api' : 'http://192.168.1.46:8081/api/v1';
const baseURL = process.env.API_BASE_URL;
// const baseURL = 'https://www.cma-fdc.com/local/api/v1'
request.config.baseURL = baseURL;
export default request;
