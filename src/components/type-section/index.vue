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
        padding-top: 20px;
        header{
            font-size: 34px;/*px*/
            font-weight: normal;
            color: #111;
            margin: 0;
            text-align: left;
            margin: 0 36px;
        }
        .type-content{
            // margin-bottom: 18px;
            .type-items{
                text-align: left;
                font-size: 28px;/*px*/
                padding: 34px 0px 60px 0;
                overflow: hidden;
                margin-left: 36px;
                li{
                    width: 50%;
                    float: left;
                    border-top: 1px solid #eee;/*no*/
                    border-right: 1px solid #eee;/*no*/
                    box-sizing: border-box;
                    height: 80px;
                    a{
                        color: @link-color;
                        padding: 14px 34px 14px 0;
                        float: left;
                        font-size: 30px;/*px*/
                        width: 100%;
                        span{
                            float: right;
                            font-size: 36px;/*px*/
                            margin-right: 12px;
                            font-weight: 300;
                            color: #ccc;
                        }
                    }
                    &:nth-child(even){
                        border-right: none;
                        padding-left: 34px;/*px*/
                    }
                    &:nth-last-child(2){
                        border-bottom: 1px solid #eee;/*no*/
                    }
                    &:last-child{
                        border-bottom: 1px solid #eee;/*no*/
                    }
                }

            }
        }
    }
</style>
