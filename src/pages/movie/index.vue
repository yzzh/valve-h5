<template>
    <div class="root">
        <!--影院热映-->
        <movieSection :movieList="movieShow" :morePath="movieShow.url"></movieSection>
        <!--免费在线观影-->
        <movieSection :movieList="movieFree" :morePath="movieFree.url"></movieSection>
        <!--新片速递-->
        <movieSection :movieList="movieLatest" :morePath="movieLatest.url"></movieSection>
        <!--发现好电影-->
        <section>
            <header>发现好电影</header>
            <div class="find-content">
                <ul class="find-items">
                    <template v-for="find in findList" >
                        <li
                            :style="{border: `1px solid ${find.color}`}"
                            >
                            <a href=""
                                :style="{color: find.color}"
                                >{{find.title}}</a>

                        </li>
                        <!--为了让内容分两行显示-->
                        <li class="br-line" v-if="find.index === 3"></li>
                    </template>
                    <!--<li v-for="find in findList" v-if="find.index <= 3"
                        :style="{border: `1px solid ${find.color}`}"
                        >
                        <a href=""
                            :style="{
                                color:find.color
                            }"
                            >{{find.title}}</a>

                    </li>-->
                    <!--为了让内容分两行显示-->
                    <!--<li class="br-line"></li>
                    <li v-for="find in findList" v-if="find.index > 3"
                        :style="{borderColor:find.color}">
                        <a href=""
                            :style="{
                                color:find.color
                            }"
                            >{{find.title}}</a>
                    </li>-->
                </ul>
            </div>
        </section>
        <!--分类浏览-->
        <section id="type">
            <header>分类浏览</header>
            <div class="type-content">
                <ul class="type-items">
                    <li v-for="typeItem in typeList" :key="typeItem.key">
                        <a href="">{{typeItem.title}}
                            <span>></span>
                        </a>
                    </li>
                    <li></li>
                </ul>
            </div>
        </section>
        <!--脚部信息组件-->
        <footerDownload :info="movieInfo"></footerDownload>
    </div>
</template>

<script src="./index.js"></script>

<style lang="less" scoped>
    @import './style.less';
</style>
