<template>
    <div id="app">
        <header class="header" id="header" v-if="$router.history.current.fullPath !== '/search'">
            <ul class="nav">
                <li
                    v-for="nav in navList"
                    :key="nav.key"
                    @click="toPage(nav.url)"
                    >
                    {{nav.title}}
                </li>
                <li @click="toSearchPage()">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-sousuo"></use>
                    </svg>
                </li>
            </ul>
            <span class="nav-search"></span>
        </header>
        <article id="content">
            <router-view/>
        </article>
    </div>
</template>

<script>
    import { navList } from './list';

    export default {
        name: 'App',
        data() {
            return {
                navList
        }
        },
        methods: {
            toPage(page) {
                this.$router.push(page);
            },
            toSearchPage() {
                this.$router.push('/search');
                console.log('search page', this.$router);
            }
        }
    }
</script>

<style lang="less">
    @import './base.less';
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #494949;
        margin-top: 100px;
        .header{
            // max-width: 650px;
            width: 750px;
            position: fixed;
            z-index: 99999;
            top: 0;
            right: 0;
            left: 0;
            text-align: center;
            border-bottom: 1px solid #f3f3f3; /*no*/
            background-color: #fff;
            .nav{
                padding: 10px 18px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                li{
                    font-size: 30px; /*px*/
                    &:first-child{
                        color: #00b600;
                        font-size: 44px; /*px*/
                        font-weight: 700;
                    }
                    &:nth-child(2){
                        color: #2384e8;
                    }
                    &:nth-child(3){
                        color: #9f7860;
                    }
                    &:nth-child(4){
                        color: #e4a813;
                    }
                    &:nth-child(5){
                        color: #2ab8cc;
                    }
                    &:last-child{
                        padding-top: 2px;
                    }
                }
            }
        }
        #content{
            // margin-top: 51px;
            height: 100%; /*监听滚动条加载数据bug*/
        }
    }
</style>
