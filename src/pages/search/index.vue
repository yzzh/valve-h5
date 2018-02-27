<template>
    <div class="search-root">
        <div class="search-header">
            <button class="close-btn" @click="goBack()">关闭</button>
            <div class="search-input">
                <input type="text" @keyup.enter.prevent="search()" v-model="inputValue">
                <span>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-sousuo1"></use>
                    </svg>
                </span>
            </div>
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
                navList,
                inputValue: ''
            }
        },
        methods: {
            goBack() {
                history.back();
            },
            search() {
                location.href=`https://m.douban.com/search/?query=${this.inputValue}`
            }
        }
    }
</script>
<style lang="less" scoped>
    @import './style.less';
</style>
