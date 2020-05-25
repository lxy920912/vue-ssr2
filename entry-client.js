import { createApp } from './src/main'
import Vue from 'vue'
const { app, router, store } = createApp();
if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}
if (window.webpackHotUpdate) {
  mixin();
}
function mixin() {
  Vue.mixin({
    beforeMount() {
      const { asyncData } = this.$options
      if (asyncData) {
        // 将获取数据操作分配给 promise
        // 以便在组件中，我们可以在数据准备就绪后
        // 通过运行 `this.dataPromise.then(...)` 来执行其他任务
        this.dataPromise = asyncData({
          store: this.$store,
          route: this.$route
        })
      }
    }
  })
  Vue.mixin({
    beforeRouteUpdate(to, from, next) {
      const { asyncData } = this.$options
      if (asyncData) {
        asyncData({
          store: this.$store,
          route: to
        }).then(next).catch(next)
      } else {
        next()
      }
    }
  })
}
router.onReady(() => {
  router.beforeResolve((to, from, next) => {
    // to and from are both route objects. must call `next`.
    const matched = router.getMatchedComponents(to);
    const preMatched = router.getMatchedComponents(from);
    let diffed = false;
    const activated = matched.filter((c, i) => {
      return diffed || (diffed = (prevMatched[i] !== c))
    });
    if (!activated.length) {
      return next();
    }
    Promise.all(activated.map(c => {
      if (c.asyncData) {
        return c.asyncData({ store, route: to })
      }
    })).then(() => {
      //停止加载指示器
      next()
    }).catch(next);
  })
  app.$mount('#app');
})