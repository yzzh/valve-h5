<template>
    <div class="book-root">
        <!--虚构类-->
        <bookSection :bookList="fiction"></bookSection>
        <!--非虚构类-->
        <bookSection :bookList="nonFiction"></bookSection>
        <!--豆瓣书店-->
        <section id="valve-bookshop">
            <div class="bookshop-header">
                <sectionHeader
                    :name="valveBookshop.headerName"
                    :path="valveBookshop.url"></sectionHeader>
                <a class="bookshop-subheader" :href="valveBookshop.header.url">
                    <div class="img-cover">
                        <img :src="valveBookshop.header.cover.url" alt="">
                    </div>
                    <div class="subheader-content">
                        <div class="subheader-title">
                            <span class="name">{{valveBookshop.header.title}}</span>
                            <span class="price">¥{{valveBookshop.header.price}}</span>
                        </div>
                        <p class="subheader-desc">{{valveBookshop.header.info}}</p>
                    </div>
                </a>
            </div>
            <div class="bookshop-content">
                <ul class="bookshop-items">
                    <listItem
                        v-for="(item,index) in valveBookshop.subject_collection_items"
                        :key="index"
                        :item="item"></listItem>
                </ul>
            </div>
        </section>
        <!--发现好电影-->
        <findSection :findList="findList"></findSection>
        <!--分类浏览-->
        <typeSection :typeList="typeList"></typeSection>
        <!--页脚-->
        <footerDownload :info="info"></footerDownload>
    </div>
</template>

<script src="./index.js"></script>

<style lang="less" scoped>
    @import './style.less';
</style>
