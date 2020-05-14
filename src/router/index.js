import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import HelloSsr from '@/components/HelloSsr'
Vue.use(Router)

export function CreateRouter() {
  return new Router({
    mode: 'history',
    routes: [{
      path: '/ssr',
      name: 'HelloSsr',
      component: HelloSsr
    },
    {
      path: '/world',
      name: 'HelloWorld',
      component: HelloWorld
    }]
  })
}