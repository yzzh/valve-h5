<template>
    <div class="search-root">
        <div class="search-header">
            <button class="close-btn" @click="goBack()">关闭</button>
            <form action="/search">
                <input type="text">
                <span>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-sousuo1"></use>
                    </svg>
                </span>
            </form>
        </div>
        <ul class="search-content">
            <li v-for="content in contentList">
                <a :href="content.href" target="_blank">
                    <strong :style="{color: content.color}">{{content.title}}</strong>
                    <p>{{content.subTitle}}</p>
                </a>
            </li>
        </ul>
        <ul class="nav-bottom">
            <li v-for="nav in navList">
                <a :href="nav.href">{{nav.title}}</a>
            </li>
        </ul>
    </div>
</template>
<script>
    import { contentList, navList } from './data.js';

    export default {
        name: 'search',
        data() {
            return {
                contentList,
                navList
            }
        },
        methods: {
            goBack() {
                history.back();
            }
        }
    }
</script>
<style lang="less" scoped>
    @import './style.less';
</style>
