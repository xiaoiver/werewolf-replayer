import VueResource from 'vue-resource'

const DEFAULT_ERROR_MSG = '网络错误'
// 请求配置参数
const OPTIONS = {
  overtime: 30000
}

class Model {
  constructor (http, globalConfig) {
    this.http = http
    this.globalConfig = globalConfig
  }

  request (
    url,
    data,
    {
      type = 'get',
      isBlob = false,
      overtime = OPTIONS.overtime
    } = {}
  ) {
    return new Promise((resolve, reject) => {
      (type === 'get'
        ? this.http.get(url, Object.assign({params: data}, OPTIONS, {overtime}))
        : this.http.post(url, data, Object.assign({}, OPTIONS, {overtime}))
      )
      .then(res => {
        if (typeof res.body === 'string') {
          try {
            res.body = JSON.parse(res.body)
          }
          catch (e) {}
        }
        return res
      })
      .then(res => {
        // 下载文件，返回<a download>
        if (isBlob && res.bodyBlob) {
          let desc = res.headers.map['content-disposition'] || res.headers.map['Content-Disposition']
          let filename = (desc && desc[0] || '').split('filename=')[1]
          let aElement = document.createElement('a')
          aElement.href = window.URL.createObjectURL(res.bodyBlob)
          aElement.download = filename
          resolve(aElement)
        }
        else if (res.body && res.body.success) {
          resolve(res.body.result)
        }
        else {
          reject(res.body && res.body.errorMsg || DEFAULT_ERROR_MSG)
        }
      })
      .catch(err => {
        reject(err || DEFAULT_ERROR_MSG)
      })
    })
  }

  post (url, data = {}, {isBlob, overtime} = {}) {
    return this.request(
      url,
      data,
      {
        type: 'post',
        isBlob,
        overtime
      }
    )
  }

  get (url, data = {}, {isBlob, overtime} = {}) {
    return this.request(url, data, {isBlob, overtime})
  }
}

Model.install = (Vue, globalConfig) => {
  Vue.use(VueResource)

  // 设置timeout
  Vue.http.interceptors.push((req, next) => {
    let timer

    if (req.overtime) {
      timer = window.setTimeout(() => {
        next(req.respondWith(req.body, {
          status: 408,
          statusText: 'Request Timeout'
        }))
      }, req.overtime)
    }

    next(res => {
      window.clearTimeout(timer)
    })
  })

  Vue.model = new Model(Vue.http, globalConfig)
}

export default Model
