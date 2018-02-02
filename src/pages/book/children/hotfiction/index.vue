<template>
    <bookChild :url="url"></bookChild>
    <!--<movie-child :url="url"></movie-child>-->
</template>

<script>
    import bookChild from '../../../../components/book-child/index.vue';
    import movieChild from '../../../../components/movie-child/index.vue';

    export default {
        name: 'hotfiction',
        data() {
            return {
                url: 'https://m.douban.com/rexxar/api/v2/subject_collection/book_fiction/items'
            }
        },
        components: {
            bookChild,
            movieChild
        }
    }
</script>
