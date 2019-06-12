import request from '@/utils/request';

// const api = {
//   login: (code) => request.post('/users/wxlogin', {
//     code: code
//   }),
//   getStations: (page, size) => request.get('/stations', {
//     page: page,
//     size: size
//   }),
//   getStation: (id) => request.get(`/stations/${id}`, null),
//   getTransactions: (page, size) => request.get('/transactions', {
//     page: page,
//     size: size
//   })
// }

// 获取站点
export function getStations (page, size) {
  return request.get('/stations', {
    page: page,
    size: size
  })
};

// 登陆
export function login (code) {
  return request.post('/users/wxlogin', {
    code: code
  });
}
