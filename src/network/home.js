import {request} from './request'

export function getHomeMultidata() {
  return request({
    url: "/home/multidata"
  })
}

//商品
export function getHomeGoods(type, page) {
  return request({
    url: 'home/data',
    params:{
      type,page
    }
  })

}


//函数调用 -> 亚述函数栈(保存函数调用过程中得所有变量)
//函数结束 -> 弹出函数栈(释放原函数所有得变量)
