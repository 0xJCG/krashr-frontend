// require('babel-polyfill')
require('es6-promise').polyfill()

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueResource from 'vue-resource'
import VueTranslate from 'vue-translate-plugin'

import App from './App'
import router from './router'

Vue.config.productionTip = false

Vue.use(VueResource)
Vue.use(VueTranslate)

Vue.http.options.emulateJSON = true
Vue.http.interceptors.push(function (request, next) {
  if (localStorage.getItem('token')) {
    request.headers.set('x-access-token', localStorage.getItem('token'))
    // request.headers.set('Access-Control-Request-Method', '*')
  }
  if (request.url.split('/')[2] !== 'haveibeenpwned.com') {
    request.headers.set('Access-Control-Allow-Origin', '*')
    request.headers.set('Accept-Language', 'en')
    // request.headers.set('Access-Control-Expose-Headers', '*')
    request.headers.set('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8')
  }
  next()
})

// ===== Bootstrap components integration (JQuery needed) ======
var $ = require('jquery')
window.jQuery = $
require('bootstrap')

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
