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
    import { getMovieShow } from '../../../../fetchs/movie/index.js';
    import listItem from '../../../../components/children/list-item.vue';

    export default {
        name: 'nowintheater',
        data() {
            return {
                movieshow: {
                    subject_collection: {},
                    subject_collection_items: []
                },
                loadStatus: 0, // 可以加载
                loadNum: 0, // 加载次数
                start: 0,
                contentHeight: ''
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
                // let loadNum = 0;
                let root = this.$refs.nontheaterRoot;
                let scroll = root.scrollHeight;
                let top = root.scrollTop;
                let height = parseInt(this.getStyle(root, 'height'), 10);
                let isLoad = scroll <= top + height + 100;
                // let start;
                if(forceFlag || this.loadStatus === 0 && isLoad){
                    this.loadStatus = 1;// 正在加载
                    // start = 0;
                    // // 第二次加载
                    // if(!forceFlag && this.loadNum === 1){
                    //     this.start = 18;
                    // };
                    // // 第三次加载
                    // if(!forceFlag && this.loadNum === 2){
                    //     this.start = 36;
                    // }
                    getMovieShow({
                        start: this.start,
                        count : 18
                    }).then(res => {
                        if(!res.subject_collection_items.length){
                            this.$refs.nontheaterRoot.removeEventListener('scroll',this.loadMovieShow.bind(this), false);
                            this.loadStatus = 2;// 加载完成
                            return;
                        };
                        // this.movieshow = {...this.movieshow, ...res};此行错，后者会覆盖前者，页面就没有第一次的数据了 ,明天看下面这两行和此行的区别
                        this.movieshow.subject_collection_items = [...this.movieshow.subject_collection_items, ...res.subject_collection_items];
                        this.movieshow.subject_collection = [...this.movieshow.subject_collection, ...res.subject_collection];
                        this.loadStatus = 0;
                        this.loadNum ++;
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
            // getMovieShow({
            //     count : '18'
            // }).then(res => {
            //     this.movieshow = res;
            //     console.log(this.movieshow);
            // })
            // 设置跟元素高度
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
