// import movie-section from '../../components/MovieSection.vue';这种方式引入和在模板中使用就报错,变量的命名规则，不能有-
import { getMovieShow, getMovieFree, getMovieLatest } from '../../fetchs/movie/index.js';
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
                url: '/movie/nowintheater/108288',
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
    // 为啥他们的请求发送顺序是正常的，数据打印出来的顺序是相反的？
    async created() {
        const res1 = getMovieShow();
        const res2 = getMovieFree();
        const res3 = getMovieLatest();
        // 这三个请求的最终完成时间由其中最长的一个来决定
        const [movieShow, movieFree, movieLatest] = await Promise.all([res1,res2,res3]);
        // Object.assign为以下三行的更简化方式
        // this.movieShow = movieShow;
        // this.movieFree = movieFree;
        // this.movieLatest = movieLatest;
        Object.assign(this.movieShow, movieShow); // 第二个参数的key会
        Object.assign(this.movieFree, movieFree);
        Object.assign(this.movieLatest, movieLatest);
        //  {
        //     movieShow,
        //     movieFree,
        //     movieLatest,
        // }) // Object.assign（target，... sources）用法=> target：拷贝的目标对象;source: 拷贝的源对象;返回：target
    }
}
