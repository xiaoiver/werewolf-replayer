// === DEFAULT / CUSTOM STYLE ===
// WARNING! always comment out ONE of the two require() calls below.
// 1. use next line to activate CUSTOM STYLE (./src/themes)
// require(`./themes/app.${__THEME}.styl`)
// 2. or, use next line to activate DEFAULT QUASAR STYLE
require(`quasar/dist/quasar.${__THEME}.css`)
// ==============================

import Vue from 'vue'
import Quasar from 'quasar'
import VueResource from 'vue-resource'
import router from './router'
import store from './store'
import Model from './model'

import * as filters from './filters'

// 注册filter
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.use(Quasar) // Install Quasar Framework
Vue.use(VueResource)
Vue.use(Model)

Quasar.start(() => {
  /* eslint-disable no-new */
  new Vue({
    el: '#q-app',
    router,
    store,
    render: h => h(require('./App'))
  })
})
