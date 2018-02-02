<template>
    <bookChild url="https://m.douban.com/rexxar/api/v2/subject_collection/book_nonfiction/items"></bookChild>
</template>

<script>
    import bookChild from '../../../../components/book-child/index.vue';

    export default {
        name: 'hotnonfiction',
        components: {
            bookChild,
        }
    }
</script>
