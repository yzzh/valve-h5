<template>
    <div ref="childRoot" class="bookchild"
        :style="{
            height: contentHeight + 'px',
            overflow: 'auto'
        }">
        <header>{{bookData.subject_collection.name}}</header>
        <ul class="bookchild-content">
            <listItem
                v-for="(item,index) in bookData.subject_collection_items"
                :item="item"
                :key="index"
                ></listItem>
        </ul>
    </div>
</template>

<script>
    import listItem from '../children/list-item.vue';
    import { getBookData } from '../../fetchs/book/index.js';

    export default {
        name: 'book-child',
        props: {
            url: String
        },
        data() {
            return {
                bookData: {
                    subject_collection: {},
                    subject_collection_items: []
                },
                loadStatus: 0,// 0 可以加载； 1 正在加载； 2 加载完成； -1 第一次取就没有数据
                start: 0,
                contentHeight: ''
            }
        },
        components: {
            listItem
        },
        methods: {
            getStyle(dom, style) {
                return document.defaultView.getComputedStyle(dom)[style];
            },
            loadBookData(e, forceflag) {
                let root = this.$refs.childRoot;
                let scroll = root.scrollHeight;
                let top = root.scrollTop;
                let height = parseInt(this.getStyle(root, 'height'), 10);
                let isLoad = scroll <= height + top + 100;//页面下滑达到需要加载数据的条件
                if(forceflag || isLoad && this.loadStatus === 0){
                    this.loadStatus = 1;
                    getBookData({
                        start: this.start,
                        count: 18,
                        url: this.url, // 取的是props中的url
                    }).then(res => {
                        // 第一次取就没有数据
                        if( this.start === 0 && !res.subject_collection_items.length ){
                            this.loadStatus = -1;
                            return;
                        };
                        // 数据取完了
                        if( !res.subject_collection_items.length ){
                            this.loadStatus = 2;
                            this.$refs.childRoot.removeEventListener('scroll', this.loadBookData.bind(this), false);
                            return;
                        };
                        this.bookData.subject_collection = {...this.bookData.subject_collection, ...res.subject_collection};
                        this.bookData.subject_collection_items = [...this.bookData.subject_collection_items, ...res.subject_collection_items];
                        this.loadStatus = 0;
                        this.start += 18;
                        console.log('this.bookData', this.bookData);
                    }).catch(err => {
                        console.log('load err', err);
                        this.loadStatus = 0;
                    })
                }
            }
        },
        mounted() {
            let headerHeight = document.getElementById('header').offsetHeight;
            this.contentHeight = window.screen.height - headerHeight;
            this.loadBookData(1, true);
            this.$refs.childRoot.addEventListener('scroll', this.loadBookData.bind(this), false);
        },
        beforeDestroy() {
            this.$refs.childRoot.removeEventListener('scroll', this.loadBookData.bind(this), false);
        }
    }
</script>
<style lang="less" scoped>
    @import '../../base.less';

    .bookchild{
        padding: 0 18px;
        header{
            font-size: 24px;
            text-align: left;
            margin: 16px 0 6px 0;
        }
        .bookchild-content{
            li{
                margin: 20px 0;
                display: block;
                width: 100%;
                overflow: hidden;
                /deep/ a{
                    display: block;
                    .list-poster{
                        float: left;
                        width: 100px;
                        margin-right: 15px;
                    }
                    .list-desc{
                        overflow: hidden;
                        text-align: left;
                        .list-title{
                            font-size: 17px;
                            white-space: normal;
                            font-weight: 700;
                        }
                        .list-rating{
                            display: flex;
                            justify-content: flex-start;
                            .star-color{
                                padding-right: 4px;
                            }
                        }
                        .list-info{
                            font-size: 12px;
                            padding-top: 6px;
                        }
                    }
                }
            }
        }
    }
</style>
