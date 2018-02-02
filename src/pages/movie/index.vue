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

<script>
    // import movie-section from '../../components/MovieSection.vue';这种方式引入和在模板中使用就报错,变量的命名规则，不能有-
    import { getMovieData } from '../../fetchs/movie/index.js';
    import movieSection from '../../components/movie-section/index.vue';
    import typeSection from '../../components/type-section/index.vue';
    import findSection from '../../components/find-section/index.vue';
    import { findList, typeList } from './data';
    import footerDownload from '../../components/footer-download/index.vue';

    export default {
        name: 'movie',
        data() {
            return {
                movieShow: {
                    url: '/movie/nowintheater',
                    // 代表name， 这行必须写，因为这行的数据是为了sectionHeader组件准备的，而这个组件中的数据是直接通过
                    // subject_collection.name点语法获取，而不是通过v-for遍历 ????
                    subject_collection: {},
                    // subject_collection_items: [] // 代表items，可以不写
                },
                movieFree: {
                    url: '/movie/watchonline',
                    subject_collection: {},
                    subject_collection_items: []
                },
                movieLatest: {
                    url: '/movie/latest',
                    subject_collection: {},
                    subject_collection_items: []
                },
                findList,
                typeList,
                movieInfo: '我们的精神角落'
            }
        },
        components: {
            movieSection,
            footerDownload,
            typeSection,
            findSection
        },
        async created() {
            // const res1 = getMovieShow();
            // const res2 = getMovieFree();
            // const res3 = getMovieLatest();
            const res1 = getMovieData({
                url : 'https://m.douban.com/rexxar/api/v2/subject_collection/movie_showing/items'
            });
            const res2 = getMovieData({
                url: 'https://m.douban.com/rexxar/api/v2/subject_collection/movie_free_stream/items'
            });
            const res3 = getMovieData({
                url: 'https://m.douban.com/rexxar/api/v2/subject_collection/movie_latest/items'
            });
            // 这三个请求的最终完成时间由其中最长的一个来决定
            const [movieShow, movieFree, movieLatest] = await Promise.all([res1,res2,res3]);
            // Object.assign（target，... sources）用法=> target：拷贝的目标对象;source: 拷贝的源对象;返回：target
            // 对象的浅拷贝，由于第一个参数中和第二个参数中相同key值的value此时是空的，第二个参数的key值会直接覆盖前面有相同key值的value
            Object.assign(this.movieShow, movieShow);
            Object.assign(this.movieFree, movieFree);
            Object.assign(this.movieLatest, movieLatest);
        }
    }
</script>

<style lang="less" scoped>
    @import './style.less';
</style>
