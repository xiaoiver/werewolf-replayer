if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'development'
}

require('colors')

var
  fs = require('fs'),
  path = require('path'),
  express = require('express'),
  webpack = require('webpack'),
  env = require('./env-utils'),
  config = require('../config'),
  opn = require('opn'),
  bodyParser = require('body-parser'),
  proxyMiddleware = require('http-proxy-middleware'),
  webpackConfig = require('./webpack.dev.conf'),
  app = express(),
  port = process.env.PORT || config.dev.port,
  uri = 'http://localhost:' + port

console.log(' Starting dev server with "' + (process.argv[2] || 'mat').bold + '" theme...')
console.log(' Will listen at ' + uri.bold)
if (config.dev.openBrowser) {
  console.log(' Browser will open when build is ready.\n')
}

var compiler = webpack(webpackConfig)

// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  stats: {
    colors: true,
    chunks: false
  }
})

var hotMiddleware = require('webpack-hot-middleware')(compiler)
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// proxy requests like API. See /config/index.js -> dev.proxyTable
// https://github.com/chimurai/http-proxy-middleware
if (!config.dev.env.MOCK) {
  Object.keys(proxyTable).forEach(function (context) {
    var options = proxyTable[context]
    if (typeof options === 'string') {
      options = { target: options }
    }
    app.use(proxyMiddleware(context, options))
  })
}

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
var staticsPath = path.posix.join(webpackConfig.output.publicPath, 'statics/')
app.use(staticsPath, express.static('./src/statics'))

// try to serve Cordova statics for Play App
app.use(express.static(env.platform.cordovaAssets))

// use mock data
var mockup = function (reqPath, reqParams) {
  if (reqPath.indexOf('?') !== -1) {
    reqPath = reqPath.substring(0, reqPath.indexOf('?'))
  }
  var filePath = path.join(__dirname, '../mock/', reqPath + '.js')
  if (fs.existsSync(filePath)) {
    console.log('mockup数据：' + reqPath)
    var response;

    if (fs.existsSync(filePath)) {
      if (require.cache[require.resolve(filePath)]) {
        delete require.cache[require.resolve(filePath)]
      }
      response = require(filePath)(reqParams)
    }
    return response;
  }
  return false;
};
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.all('*', (req, res) => {
  if (config.dev.env.MOCK) {
    res.json(mockup(req.url, req.method === 'GET' ? req.query : req.body))
  }
});

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }

  // open browser if set so in /config/index.js
  if (config.dev.openBrowser) {
    devMiddleware.waitUntilValid(function () {
      opn(uri)
    })
  }
})
