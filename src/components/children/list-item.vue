<template>
    <li class="list-item" >
        <a href="javascript:;">
            <div class="list-poster"
                :style="{
                    backgroundImage:`url(${item.cover.url})`,
                }"
                >
            </div>
            <div class="list-title">{{item.title}}</div>
            <!--图标字体 小星星、评分（有评分才存在）-->
            <div class="list-rating" v-if="item.rating !== null">
                <div class="star-color">
                    <div class="star-color-grey">
                        <span class="rating-star" v-for="n in 5">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-xingxing"></use>
                            </svg>
                        </span>
                    </div>
                    <div class="star-color-red" :style="{width: `${item.rating.value/10*100}%`}">
                        <span class="rating-star-color" v-for="n in 5">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-xingxing"></use>
                            </svg>
                        </span>
                    </div>
                </div>
                <span class="rating-value">{{item.rating.value}}</span>
            </div>
            <!--暂无评分 （rating === null）-->
            <div class="no-rating" v-if="item.rating === null && item.price === null">暂无评分</div>
            <div class="no-rating" v-if="item.rating === null && item.price !== null">¥{{item.price}}</div>
        </a>
    </li>
</template>

<script>
    export default {
        name: 'list-item', // li模板
        props: {
            item: Object, // 这里的item代表的是父组件中需要v-for使用数组中的每一个元素，单个元素是个Object
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
    // @import './style.less';
    // 电影评分处公用样式
    .rating-public{
        font-size: 12px;
        margin-top: 5px;
        color: #aaa;
        line-height: 1;
    }

    .list-item{
        display: inline-block;
        margin-left: 18px;
        width: 100px;
        a{
            color:#111;
            .list-poster{ // 以背景图片的方式显示图片，配合以下的:before（:after也行）来控制图片的大小 ？？
                background-size: cover;
                background-position: center;
                overflow: hidden;
                &:after{
                    content:'';
                    float: left;
                    margin-top: 144%; // 图片的高宽比
                }
            }
            .list-title{
                font-size: 15px;
                margin-top: 10px;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
            }
            .list-rating{
                .rating-public;
                display: flex;
                justify-content: space-around;
                height: 12px;
                .star-color{
                    position: relative;
                    text-align: center;
                    .star-color-red{
                        position: absolute;
                        left: 0px;
                        top: 0;
                        overflow: hidden; // 配合精确到百分比显示评分的小星星
                        white-space: nowrap;
                        .rating-star-color{
                            color: red;
                        }
                    }
                }
            }
            .no-rating{
                .rating-public;
            }
        }
    }
</style>
