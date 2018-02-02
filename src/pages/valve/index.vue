<template>
    <div ref="root" class="index" :style="{ height: contentHeight + 'px'}">
        <ul class="quick-page page-ul">
            <li class="page-li" v-for="page in pageList">
                <a :href="page.href" class="page-a">{{page.title}}</a>
            </li>
        </ul>
        <div class="recommend-feed">
        <a class="feed-item"
           v-for="recommend in recommends"
           :href="recommend.target.url"
            >
            <div class="feed-content">
                <div class="feed-img"
                    :style="{ backgroundImage: `url(${recommend.target.cover_url})`}"
                    >
                    <!--<img src="https://img3.doubanio.com/img/files/file-1516877014.jpg" alt="">-->
                    <div class="img-bottom"></div>
                </div>
                <h3 class="feed-title">{{recommend.title}}</h3>
                <p class="feed-desc">{{recommend.target.desc}}</p>
            </div>
            <div class="feed-author">
                <span class="author-name">by{{recommend.target.author.name}}</span>
                <span class="author-source">{{recommend.source_cn}}</span>
            </div>
        </a>
        </div>
    </div>
</template>

<script src="./index.js"></script>

<style lang="less" scoped>
    @import './style.less';
</style>
