import Vue from 'vue'
import axios from 'axios'
import VueRouter from 'vue-router'
import routes from './router/router'
import store from './store/'
import { routerMode, baseUrl } from './config/env'
import './config/rem'
import FastClick from 'fastclick'
import 'mint-ui/lib/style.css'
import Mint from 'mint-ui';
import { Indicator } from 'mint-ui';
import $ from 'jquery'

if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function () {
    FastClick.attach(document.body);
  }, false);
}

Vue.use(Mint);
const router = new VueRouter({
  routes,
  mode: routerMode,
  strict: process.env.NODE_ENV !== 'production',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      if (from.meta.keepAlive) {
        from.meta.savedPosition = document.body.scrollTop;
      }
      return { x: 0, y: to.meta.savedPosition || 0 }
    }
  }
})
router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  let userInfo = JSON.parse(localStorage.getItem('userInfo'));
  if (to.meta.auth)//需要登录
  {
    if (userInfo) {//已经登录了
      next()
    }
    else {
      if (to.path == '/classifyIndex' || to.path == '/info' || to.path == '/register') {
        next();
      }
      else {
        next({
          path: '/login',
        })
      }
      // next({
      //   path: '/mallIndex',
      // })
      // router.replace({
      //   path: '/login'
      // })
      // next()
    }
  } else {
    next();
  }
})
Vue.use(VueRouter)
/**
 * @description 全局请求配置
 */


 //axios.defaults.baseURL ='http://www.tttt.com:788/';//本地
//axios.defaults.baseURL ="http://15x29c7444.iask.in:38662";
axios.defaults.baseURL = 'http://www.n12365.com/api/';//线上

Vue.prototype.$global = {
  appid: "wxf37fb4f17d6256c3",
  url: "http://ym.m12315.com"
}


// axios.defaults.headers.common['Authorization'] = 'AUTH_TOKEN';
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// 添加一个请求拦截器
axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  Indicator.open({
    spinnerType: 'fading-circle'
  });
  var token = localStorage.getItem('Authorization')
  if (token) {
    config.headers['Authorization'] = token;
  }


  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});
// 添加一个响应拦截器
axios.interceptors.response.use(function (response) {
  // Do something with response data
  Indicator.close();
  return response;
}, function (error) {
  // Do something with response error
  return Promise.reject(error);
});
Vue.prototype.$axios = axios;


new Vue({
  router,
  store,
}).$mount('#app')
