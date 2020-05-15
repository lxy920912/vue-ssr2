import { createApp } from './src/main'
const { app, router, store } = createApp();
if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}
router.onReady(() => {
  console.log("router............")
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