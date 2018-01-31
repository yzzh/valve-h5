<template>
    <div class="root">
        <!--影院热映-->
        <movieSection :movieList="movieShow" :morePath="movieShow.url"></movieSection>
        <!--免费在线观影-->
        <movieSection :movieList="movieFree" :morePath="movieFree.url"></movieSection>
        <!--新片速递-->
        <movieSection :movieList="movieLatest" :morePath="movieLatest.url"></movieSection>
        <!--发现好电影-->
        <findSection :findList="findList"></findSection>
        <!--分类浏览-->
        <typeSection :typeList="typeList"></typeSection>
        <!--页脚-->
        <footerDownload :info="movieInfo"></footerDownload>
    </div>
</template>

<script src="./index.js"></script>

<style lang="less" scoped>
    @import './style.less';
</style>
