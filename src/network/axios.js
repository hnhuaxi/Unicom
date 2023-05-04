import originAxios from 'axios'
import { Toast } from 'react-vant'

export default function axios(option) {
  originAxios.defaults.headers.post['Content-Type'] = 'application/json';
  originAxios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
  originAxios.defaults.baseURL = process.env.REACT_APP_API_URL;

  return new Promise((resolve, reject) => {
    const instance = originAxios.create({
      // baseURL: baseUrl,
      // timeout: 10000,
    })

    instance.interceptors.request.use(
      config => {
        // 不传递默认开启loading
        if (!config.hideloading) {
          // loading
          Toast.loading({
            message: '加载中...',
            forbidClick: true,
            // duration: '10000',
            loadingType: 'spinner'
          })
        }
        return config
      },
      err => {
        return err
      }
    )

    instance.interceptors.response.use(
      response => {
        Toast.clear()
        const res = response.data
        let message = '加载中...'
        // console.log(response.config.url)
        // console.log(res)
        if (res.code && res.code !== 200 && res.code !== '200') {
          // 登录超时,重新登录
          switch (res.code) {
            case 401:
              message = res.msg ? res.msg : '超时...'
              break
            default:
              message = res.msg ? res.msg : '请等待...'
              break
          }
          Toast.fail({
            message: message,
            forbidClick: true,
            duration: '500',
          })
        }
        return response.data
      },
      err => {
        Toast.clear()
        return Promise.reject(err)
      }
    )

    instance(option)
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}

