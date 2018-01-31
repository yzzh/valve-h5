<template>
    <section class="type-section">
        <header>{{typeList.header}}</header>
        <div class="type-content">
            <ul class="type-items">
                <li v-for="typeItem in typeList.items" :key="typeItem.key">
                    <a href="">{{typeItem.title}}
                        <span>></span>
                    </a>
                </li>
                <li v-if="typeList.items.length % 2 !== 0"></li>
            </ul>
        </div>
    </section>
</template>

<script>
    export default {
        name: 'type-section',
        props: {
           typeList: Object
        }
    }
</script>

<style lang="less" scoped>
    @import '../../base.less';

    .type-section{
        overflow: hidden;
        background-color: #fff;
        padding-top: 10px;
        header{
            font-size: 17px;
            font-weight: normal;
            color: #111;
            margin: 0;
            text-align: left;
            margin: 0 18px;
        }
        .type-content{
            // margin-bottom: 18px;
            .type-items{
                text-align: left;
                font-size: 14px;
                padding: 17px 0px 30px 0;
                overflow: hidden;
                margin-left: 18px;
                li{
                    width: 50%;
                    float: left;
                    border-top: 1px solid #eee;
                    border-right: 1px solid #eee;
                    box-sizing: border-box;
                    height: 40px;
                    a{
                        color: @link-color;
                        padding: 7px 17px 7px 0;
                        float: left;
                        font-size: 15px;
                        width: 100%;
                        span{
                            float: right;
                            font-size: 18px;
                            margin-right: 6px;
                            font-weight: 300;
                            color: #ccc;
                        }
                    }
                    &:nth-child(even){
                        border-right: none;
                        padding-left: 17px;
                    }
                    &:nth-last-child(2){
                        border-bottom: 1px solid #eee;
                    }
                    &:last-child{
                        border-bottom: 1px solid #eee;
                    }
                }

            }
        }
    }
</style>
