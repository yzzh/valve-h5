<template>
    <div class="root">
        <!--影院热映-->
        <movieSection :movieList="movieShow"></movieSection>
        <!--免费在线观影-->
        <movieSection :movieList="movieFree"></movieSection>
        <!--新片速递-->
        <movieSection :movieList="movieLatest"></movieSection>
    </div>
</template>

<script>
  import { getMovieShow, getMovieFree, getMovieLatest } from '../../fetchs/movie/index.js';
//   import sectionHeader from '../../components/section-header.vue';
//   import movie-section from '../../components/MovieSection.vue';这种方式引入和在模板中使用就报错？？
  import movieSection from '../../components/movie-section/index.vue';

  export default {
    name: 'movie',
    data() {
      return {
        movieShow: {
            subject_collection: {}, // title
            subject_collection_items: [] // items
        },
        movieFree: {
            subject_collection: {},
            subject_collection_items: []
        },
        movieLatest: {
            subject_collection: {},
            subject_collection_items: []
        }
      }
    },
    components: {
        movieSection
    },
    // 为啥他们的请求发送顺序是正常的，数据打印出来的顺序是相反的？
    async created() {
        const res1 = getMovieShow();
        const res2 = getMovieFree();
        const res3 = getMovieLatest();
        // 这三个请求的最终完成时间由其中最长的一个来决定
        const [movieShow, movieFree, movieLatest] = await Promise.all([res1,res2,res3]);
        // console.log('影院热映',res);
        // Object.assign为以下三行的更简化方式
        // this.movieShow = movieShow;
        // this.movieFree = movieFree;
        // this.movieLatest = movieLatest;
        Object.assign(this, {
            movieShow,
            movieFree,
            movieLatest,
        }) // Object.assign（target，... sources）用法=> target：拷贝的目标对象;source: 拷贝的源对象;返回：target
    },
    methods: {
        getStars(value) {
            let result;
            if (value > 0 && value <= 2){
                result = 1;
            }else if(value <= 4){
                result = 2;
            }else if(value <= 6){
                result = 3;
            }else if(value <= 9){
                result = 4;
            }else{
                result = 5;
            }
            return result;
        }
    }
  }
</script>

<style lang="less" scoped>
    @import './style.less';
</style>
