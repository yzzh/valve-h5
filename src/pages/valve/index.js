import { getRecommend } from '../../fetchs/valve/index.js';
import { format } from '../../utils/date';
import { pageList } from '../../list'

// 一天的毫秒数
const oneDayTime = 24 * 60 * 60 * 1000;
export default {
    name: 'valve',
    data() {
        return {
        contentHeight:'',// 页面中除去header高度的页面高度
        recommends: [],
        loadingStatus: 0, // 0 可以加载  1  正在加载  2  加载完成   -1   无数据
        currentTime: new Date().getTime(),
        pageList
        }
    },
    async created() {
        // getRecommend().then( res => {
        //   // console.log('res',res);
        //   this.recommends = res.recommend_feeds;
        //   // console.log('recommends',this.recommends)
        // })
    },
    methods: {
        loadRecommendList(e, forceFlag) {
        var root = this.$refs.root;
        var scrollHeight = root.scrollHeight;
        var scrollTop = root.scrollTop;//parseInt(this.getStyle(root, 'scrollTop'), 10);
        var height = parseInt(this.getStyle(root, 'height'), 10);// 获取根节点的高度，如'4386px'
        // 此值的真假决定是否需要重新获取数据
        var isLoadData = scrollHeight <= height + scrollTop + 100;
        if (forceFlag || this.loadingStatus === 0 && isLoadData) {
            this.loadingStatus = 1; //正在加载
            // 第一次进入此页面时next_date需要传一个空字符串，服务端返回当天日期
            let next_date = '';
            // 第二次进入此函数会执行此代码块
            if(!forceFlag) {
                next_date = format(new Date(this.currentTime), 'yyyy-MM-dd');
                this.currentTime -= oneDayTime;
            }
            getRecommend({
                next_date
            })
                //.then表示数据获取成功以后。相当于success()
                .then(res => { // res即response意思，一个变量名，这里代表获取成功以后返回的数据
                    console.log('下拉加载的数据',res);
                    //将this.list(data声明的数组属性list)和list(变量list)展开然后合并
                    this.recommends = [...this.recommends, ...res.recommend_feeds];
                    console.log('下拉加载后合并的数据',this.recommends);
                    let dataLength = res.recommend_feeds.length;
                    if (!dataLength && next_date === '') {
                        this.loadingStatus = -1; //第一次取就无数据,return出去，不再执行后面的语句，解释状态码的意义
                        return;
                    }
                    if (!dataLength) {
                        this.loadingStatus = 2; //获取不到数据，加载完成
                        return;
                    }
                    this.loadingStatus = 0; //数据获取成功，状态码改为0

                })
                //.catch表示不成功的情况
                .catch(err => {
                    this.loadingStatus = 0;
                })
        }
        },
        getStyle(dom, style) {
            return document.defaultView.getComputedStyle(dom)[style];
        },
    },
    mounted() {
        let headerHeight = document.getElementById('header').offsetHeight;;
        let contentHeight = window.screen.height - headerHeight;
        this.contentHeight = contentHeight;
        this.loadRecommendList(1, true);
        this.$refs.root.addEventListener('scroll',this.loadRecommendList.bind(this), false);
    },
    beforeDestroy() {
        this.$refs.root.removeEventListener('scroll', this.loadRecommendList.bind(this), false)
    }
}
