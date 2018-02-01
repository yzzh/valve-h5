
import Vue from 'vue'
import Router from 'vue-router'
import valve from '../pages/valve/index.vue'
import movie from '../pages/movie/index.vue'
import book from '../pages/book/index.vue'
import airing from '../pages/airing/index.vue'
import group from '../pages/group/index.vue'
const search = () => System.import('../pages/search/index.vue');
// 此为异步加载，即懒加载
// const nowintheater = () => System.import('../pages/movie/children/nowintheater/index.vue');
import nowintheater from '../pages/movie/children/nowintheater/index.vue'
const watchonline = () => System.import('../pages/movie/children/watchonline/index.vue');
const latest = () => System.import('../pages/movie/children/latest/index.vue');

Vue.use(Router)

export default new Router({
    mode: 'history',
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
        },
        {
            path: '/search',
            name: 'search',
            component: search
        },
        {
            path: '/movie/nowintheater',
            name: 'nowintheater',
            component: nowintheater
        },
        {
            path: '/movie/watchonline',
            name: 'watchonline',
            component: watchonline
        },
        {
            path: '/movie/latest',
            name: 'latest',
            component: latest
        }
    ]
})

