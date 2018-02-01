<template>
    <!--这里的url是向子组件movieChild中传入写死的字符串-->
    <movieChild url='https://m.douban.com/rexxar/api/v2/subject_collection/movie_showing/items'></movieChild>
</template>

<script>
    import movieChild from '../../../../components/movie-child/index.vue';

    export default {
        name: 'nowintheater',
        components: {
            movieChild
        }
    }
</script>
