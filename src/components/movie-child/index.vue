<template>
    <div class="moviechild" ref="moviechildRoot"
        :style="{
            height: contentHeight + 'px',
            overflow: 'auto'
        }">
        <header>{{movieData.subject_collection.name}}</header>
        <ul class="moviechild-content">
            <listItem
                v-for="(item,index) in movieData.subject_collection_items"
                :item="item"
                :key="index"
            ></listItem>
        </ul>
    </div>
</template>

<script>
    import { getMovieData } from '../../fetchs/movie/index.js';
    import listItem from '../children/list-item.vue';

    export default {
        name: 'movie-child',
        props: {
            url: String // loadmovieData方法中的getMovieData方法中父组件用的时候动态传入的参数，
        },
        data() {
            return {
                movieData: {
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
            loadmovieData(e, forceFlag){
                let root = this.$refs.moviechildRoot; // DOM中的moviechildRoot是变量，所以不能要用驼峰式命名法
                let scroll = root.scrollHeight;
                let top = root.scrollTop;
                let height = parseInt(this.getStyle(root, 'height'), 10);
                let isLoad = scroll <= top + height + 100;
                if(forceFlag || this.loadStatus === 0 && isLoad){
                    this.loadStatus = 1;// 正在加载
                    getMovieData({// 用获取电影数据接口抽象函数获取数据
                        start: this.start,
                        count: 18,
                        url: this.url
                        // _ : '1517210951139' 动态时间戳，可以不传
                    })
                    .then(res => {
                        // 第一次取就没有数据
                        if(this.start === 0 && !res.subject_collection_items.length){
                            this.loadStatus = -1;
                            return;
                        }
                        if(!res.subject_collection_items.length){
                            this.$refs.moviechildRoot.removeEventListener('scroll',this.loadmovieData.bind(this), false);
                            this.loadStatus = 2;// 加载完成，没有数据了，修改状态，防止再次去获取数据
                            return;
                        };
                        // 此行错，后者会覆盖前者，页面就没有第一次subject_collection_items的数据了,
                        // this.movieData = {...this.movieData, ...res};
                        // 而subject_collection每次都一样，所以覆盖住了也没关系,用下面这一行也可以
                        // this.movieData.subject_collection = res.subject_collection;
                        this.movieData.subject_collection = {...this.movieData.subject_collection, ...res.subject_collection};
                        this.movieData.subject_collection_items = [...this.movieData.subject_collection_items, ...res.subject_collection_items];
                        this.loadStatus = 0; //数据获取到以后修改加载状态为可以加载
                        this.start += 18;
                        console.log('this.movieData', this.movieData);
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
            this.contentHeight = window.screen.height * window.dpr - headerHeight;
            this.loadmovieData(1, true);
            this.$refs.moviechildRoot.addEventListener('scroll',this.loadmovieData.bind(this), false);
        },
        beforeDestroy() {
            this.$refs.moviechildRoot.removeEventListener('scroll',this.loadmovieData.bind(this), false);
        }
    }
</script>

<style lang="less" scoped>
    .moviechild{
        header{
            font-size: 24px;/*px*/
            padding-left:36px;
            text-align: left;
            padding-top: 30px;
        }
        .moviechild-content{
            padding-top: 40px;
            li  {
                margin: 0;
                width: 33.33%;
                padding: 0 4% 40px 4%;
                float: left;
                box-sizing: border-box;
                color: #9b9b9b;
                position: relative;
                 /deep/ .list-title { // /deep/具备穿透效果，可用于修改复用的子组件的样式（该选择器代表的DOM不在父组件的模板中），
                    font-size: 26px;/*px*/
                    margin-top: 10px;
                }
                /deep/ .action-tag{
                    position: absolute;
                    right: 26px;
                    bottom: 122px;
                }
            }
        }
    }
</style>
