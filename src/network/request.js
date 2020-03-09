//default只能默认导出来一个实例

import axios from 'axios'

export function request(config) {

  // 1.创建axios实例
  const instance = axios.create({
    baseURL: "http://123.207.32.32:8000/api/wh",
    timeout: 5000
  })

  // 2.axios拦截器
  // 2.1请求拦截
  instance.interceptors.request.use(config => {
    // console.log('请求打印：', config);
    // 1.比如说config中的一些信息不符合服务器的要求;
    // 2.比如我们每次发送网络请求时，我们都希望显示一个请求的图标;
    // 3.某些网络清秀(比如必须携带(token)，必须携带一些特殊的信息;

    return config
  }, err => {
    console.log(err);
  })


  //2.2响应拦截
  instance.interceptors.response.use(res => {
    return res.data
  }, err => {
    console.log(err);
  })


  //3.发送真正的网络请求:本身就返回一个Promise，因此就没有必要再new一个Promise
  return instance(config)


}

