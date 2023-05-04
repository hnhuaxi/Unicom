import axios from './axios'

/**
 * 获取号码
 * @param {"provinceCode":"50","cityCode":"501","goodsId":"503202151381","count":10} data 
 * @returns 
 */
export function selectNumbers(data) {
  return axios({
    url: "/api/v1/zop/selects",
    method: "post",
    data,
    hideloading: false
  });
}

/**
 * 验证用户身份证
 * @param {"province":"50","city":"501","certNum":"43108119980421xxx","certName":姓名} data 
 * @returns 
 */
export function validAuth(data) {
  return axios({
    url: "/api/v1/zop/valid",
    method: "post",
    data,
    hideloading: false
  });
}

/**
 * 意向订单提交
 * @param {"province":"50","city":"501","certNum":"503202151381","certName":10} data 
 * @returns 
 */
export function preOrder(data) {
  return axios({
    url: "/api/v1/zop/preorder",
    method: "post",
    data,
    hideloading: false
  });
}


/**
 * 正式订单提交
 * @order {"province":"50","city":"501","certNum":"503202151381","certName":10} data 
 * @returns 
 */
export function Order(data) {
  return axios({
    url: "/api/v1/zop/order",
    method: "post",
    data,
    hideloading: false
  });
}