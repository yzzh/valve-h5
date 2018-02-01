<template>
    <!--这里的url是通过动态属性的方式传入子组件需要的数据-->
    <movieChild :url="url"></movieChild>
</template>

<script>
    import movieChild from '../../../../components/movie-child/index.vue';

    export default {
        name: 'watchonline',
        data(){
            return {
                url: 'https://m.douban.com/rexxar/api/v2/subject_collection/movie_free_stream/items'
            }
        },
        components: {
            movieChild
        }
    }
</script>
