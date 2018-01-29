<template>
    <div id="app">
        <header class="header" id="header">
            <ul class="nav">
                <li class="nav-li"
                    v-for="nav in navList"
                    :key="nav.key"
                    @click="toPage(nav.url)"
                    >
                    {{nav.title}}
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
            }
        }
    }
</script>

<style lang="less">
    @import './app.less';
</style>
