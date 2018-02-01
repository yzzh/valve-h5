<template>
    <div id="nontheater" ref="nontheaterRoot" :style="{
        height: contentHeight + 'px',
        overflow: 'auto'
        }">
        <header>{{movieshow.subject_collection.name}}</header>
        <ul class="nontheater-content">
            <listItem
                v-for="(item,index) in movieshow.subject_collection_items"
                :item="item"
                :key="index"
            ></listItem>
        </ul>
    </div>
</template>

<script>
    // import { getMovieShow } from '../../../../fetchs/movie/index.js';
    import { getMovieData } from '../../../../fetchs/movie/index.js';
    import listItem from '../../../../components/children/list-item.vue';

    export default {
        name: 'nowintheater',
        data() {
            return {
                movieshow: {
                    subject_collection: {},
                    subject_collection_items: []
                },
                loadStatus: 0, // 加载状态，0 可以加载；1 正在加载
                start: 0, // 获取数据时变化的参数
                contentHeight: '' // DOM中出去header元素的根元素的高度，监听滚动条需要与此高度及overflow结合起来
            }
        },
        components: {
            listItem
        },
        methods: {
            getStyle(dom, style){
                return document.defaultView.getComputedStyle(dom)[style];
            },
            loadMovieShow(e, forceFlag){
                let root = this.$refs.nontheaterRoot; // DOM中的nontheaterRoot是变量，所以不能要用驼峰式命名法
                let scroll = root.scrollHeight;
                let top = root.scrollTop;
                let height = parseInt(this.getStyle(root, 'height'), 10);
                let isLoad = scroll <= top + height + 100;
                if(forceFlag || this.loadStatus === 0 && isLoad){
                    this.loadStatus = 1;// 正在加载
                    // getMovieShow({
                    //     start: this.start,
                    //     count : 18
                    // })
                    getMovieData({ // 用获取电影数据接口抽象函数获取数据
                        start: this.start,
                        count: 18
                    })
                    .then(res => {
                        // 第一次取就没有数据
                        if(this.start === 0 && !res.subject_collection_items.length){
                            this.loadStatus = -1;
                            return;
                        }
                        if(!res.subject_collection_items.length){
                            this.$refs.nontheaterRoot.removeEventListener('scroll',this.loadMovieShow.bind(this), false);
                            this.loadStatus = 2;// 加载完成，没有数据了，修改状态，防止再次去获取数据
                            return;
                        };
                        // this.movieshow = {...this.movieshow, ...res};此行错，后者会覆盖前者，页面就没有第一次的数据了 ,明天看下面这两行和此行的区别
                        this.movieshow.subject_collection = {...this.movieshow.subject_collection, ...res.subject_collection};
                        this.movieshow.subject_collection_items = [...this.movieshow.subject_collection_items, ...res.subject_collection_items];
                        this.loadStatus = 0; //数据获取到以后修改加载状态为可以加载
                        this.start += 18;
                        console.log('this.movieshow', this.movieshow);
                    })
                    .catch(err => {
                        console.log('err', err);
                        this.loadStatus = 0;
                    })
                }
            }
        },
        mounted() {
            // 设置根元素高度（除去header元素）
            let headerHeight = document.getElementById('header').offsetHeight;
            this.contentHeight = window.screen.height - headerHeight;
            this.loadMovieShow(1, true);
            this.$refs.nontheaterRoot.addEventListener('scroll',this.loadMovieShow.bind(this), false);
        },
        beforeDestroy() {
            this.$refs.nontheaterRoot.removeEventListener('scroll',this.loadMovieShow.bind(this), false);
        }
    }
</script>

<style lang="less" scoped>
    @import '../../../../global.less';

    #nontheater{
        header{
            font-size: 24px;
            padding-left: 18px;
            text-align: left;
            padding-top: 15px;
        }
        .nontheater-content{
            padding-top: 20px;
            max-width: 660px;
            li  {
                margin: 0;
                width: 33.33%;
                padding: 0 4% 20px 4%;
                float: left;
                box-sizing: border-box;
                color: #9b9b9b;
                 /deep/ .list-title { // /deep/具备穿透效果，可用于修改复用的子组件的样式（该选择器代表的DOM不在父组件的模板中），
                    font-size: 13px;
                    margin-top: 5px;
                }
            }
        }
    }
</style>
