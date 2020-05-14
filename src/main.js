// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import { CreateRouter } from './router'

export function createApp() {
  const router = new CreateRouter();
  const app = new Vue({
    router,
    render: h => h(App)
  });
  return { app, router }
}

// Vue.config.productionTip = false

/* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   router,
//   components: { App },
//   template: '<App/>'
// })
