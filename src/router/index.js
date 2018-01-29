
import Vue from 'vue'
import Router from 'vue-router'
import valve from '../pages/valve/index.vue'
import movie from '../pages/movie/index.vue'
import book from '../pages/book/index.vue'
import airing from '../pages/airing/index.vue'
import group from '../pages/group/index.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'valve',
      component: valve
    },
    {
      path: '/movie',
      name: 'movie',
      component: movie
    },
    {
      path: '/book',
      name: 'book',
      component: book
    },
    {
      path: '/airing',
      name: 'airing',
      component: airing
    },
    {
      path: '/group',
      name: 'group',
      component: group
    }
  ]
})

