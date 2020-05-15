// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import { CreateRouter } from './router'
import { createStore } from './store'
import { sync } from 'vuex-router-sync'
export function createApp() {
  const router = new CreateRouter();
  const store = new createStore();

  // 同步路由状态(route state)到 store
  // sync(store, router)
  const app = new Vue({
    router,
    store,
    render: h => h(App)
  });
  return { app, router, store }
}

// Vue.config.productionTip = false

/* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   router,
//   components: { App },
//   template: '<App/>'
// })
