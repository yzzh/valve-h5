<template>
    <section class="book-section">
        <sectionHeader
            :name="bookList.headerName"
            :path="bookList.url"></sectionHeader>
        <div class="section-content">
            <ul class="book-items">
                <listItem
                    v-for="(item,index) in bookList.subject_collection_items"
                    :item="item"
                    :key="index"></listItem>
            </ul>
        </div>
    </section>
</template>

<script>
    import sectionHeader from '../children/section-header.vue';
    import listItem from '../children/list-item.vue';

    export default {
        name: 'book-section',
        props: {
            bookList: Object
        },
        components: {
            sectionHeader,
            listItem
        }
    }
</script>

<style lang="less" scoped>
    @import '../../global.less';
    @import '../../base.less';

    .book-section{
        padding-top: 10px;
        background-color: #fff;
        // 方法一：遮住横向滚动条，与其子元素的margin-bottom:-18px配合使用，让其后面的兄弟盖住此元素的横向滚动条。若不用这个，则此元素会纵向盖住下一个兄弟元素
        // position: relative;
        // 方法二：遮住横向滚动条，与方法一相同作用
        overflow: hidden;
        header{
            position: relative;
            margin: 0 18px;
        }
        .section-content{
            margin-bottom: -18px; // 遮住横向滚动条
            .book-items{
                padding: 15px 0 43px 0; // padding-bottom的值设得比较大是为了配合其父元素的margin-bottom一起盖住横向滚动条
                overflow-x: auto;
                white-space: nowrap;
                // 一个父元素的子元素设置为display:inline-block时，子元素横向摆放时中间可能会有空隙，会影响布局，这时可以把父元素的font-size设置为0，子元素的font-size可重新设置。
                font-size: 0;
                border-bottom: 1px solid #ddd;// 测试横向滚动条是否能看见
            }
        }
    }
</style>
