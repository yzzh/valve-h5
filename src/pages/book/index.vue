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

<script>
    import { getBookData } from '../../fetchs/book/index.js';
    import bookSection from '../../components/book-section/index.vue';
    import sectionHeader from '../../components/children/section-header.vue';
    import listItem from '../../components/children/list-item.vue';
    import typeSection from '../../components/type-section/index.vue';
    import findSection from '../../components/find-section/index.vue';
    import { typeList, findList } from './data';
    import footerDownload from '../../components/footer-download/index.vue';

    export default {
        name: 'book',
        data() {
            return {
                fiction: {
                    url: '/book/hotfiction',
                    headerName: '最受关注图书｜虚构类',
                    subject_collection_items: [] // 模板中用到了这行数据，所以需要先在data中声明，否则vue无法追踪
                },
                nonFiction: {
                    url: '/book/hotnonfiction',
                    headerName: '最受关注图书｜非虚构类',
                    subject_collection_items: []
                },
                valveBookshop: {
                    // url: '/book/bookshop',
                    url: 'https://market.douban.com/book/?utm_campaign=book_freyr_section&utm_source=douban&utm_medium=mobile_web',
                    headerName: '豆瓣书店',
                    header: {
                        cover: {}
                    },
                    subject_collection_items: []
                },
                typeList,
                findList,
                info: '我们的精神角落'
            }
        },
        components: {
            bookSection,
            sectionHeader,
            listItem,
            typeSection,
            findSection,
            footerDownload
        },
        async created() {
            const [fiction, nonFiction, valveBookshop] = await Promise.all([
                getBookData({
                    url: 'https://m.douban.com/rexxar/api/v2/subject_collection/book_fiction/items'
                }),
                getBookData({
                    url: 'https://m.douban.com/rexxar/api/v2/subject_collection/book_nonfiction/items'
                }),
                getBookData({
                    url: 'https://m.douban.com/rexxar/api/v2/subject_collection/market_product_book_mobile_web/items'
                })
            ]);
            Object.assign(this.fiction, fiction);
            Object.assign(this.nonFiction, nonFiction);
            Object.assign(this.valveBookshop, valveBookshop);
        }
    }
</script>

<style lang="less" scoped>
    @import './style.less';
</style>
