
import Vue from 'vue'
import Router from 'vue-router'
// 此为异步加载，即懒加载
const valve = () => System.import('../pages/valve/index.vue');
const movie = () =>  System.import('../pages/movie/index.vue');
const book = () =>  System.import('../pages/book/index.vue')
const airing = () =>  System.import('../pages/airing/index.vue');
const group = () => System.import('../pages/group/index.vue');
const search = () => System.import('../pages/search/index.vue');
const nowintheater = () => System.import('../pages/movie/children/nowintheater/index.vue')
const watchonline = () => System.import('../pages/movie/children/watchonline/index.vue');
const latest = () => System.import('../pages/movie/children/latest/index.vue');
const hotfiction = () => System.import('../pages/book/children/hotfiction/index.vue');
const hotnonfiction = () => System.import('../pages/book/children/hotnonfiction/index.vue');

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
        },
        {
            path: '/book/hotfiction',
            name: 'hotfiction',
            component: hotfiction
        },
        {
            path: '/book/hotnonfiction',
            name: 'hotnonfiction',
            component: hotnonfiction
        }
    ]
})

