<template>
    <section class="find-section">
        <header>{{findList.header}}</header>
        <div class="find-content">
            <ul class="find-items">
                <template v-for="find in findList.items" >
                    <li
                        :style="{border: `1px solid ${find.color}`}"
                        >
                        <a :href="find.url"
                            :style="{color: find.color}"
                            >{{find.title}}</a>

                    </li>
                    <!--为了让内容分两行显示-->
                    <li class="br-line" v-if="find.index === 3"></li>
                </template>
            </ul>
        </div>
    </section>
</template>

<script>
    export default {
        name: 'find-section',
        props: {
            findList: Object
        }
    }
</script>

<style lang="less" scoped>
    .find-section{
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
        .find-content{
            margin-bottom: -36px;
            .find-items{
                overflow-x: auto;
                font-size: 0;
                white-space: nowrap;
                padding: 30px 0px 86px 0px;
                margin-left: 36px;
                li{
                    display: inline-block;
                    margin: 0px 16px 16px 0px;
                    border-radius: 2px;/*no*/
                    border: solid 1px;/*no*/
                    a{
                        display: block;
                        padding: 0 48px;
                        height: 100px;
                        line-height: 100px;
                        font-size: 30px;/*px*/
                        overflow: auto;
                    }
                }
                .br-line{
                    display: block;
                    height: 2px;
                    border: 0;
                    margin: 0;
                    width: 100%;
                }
            }
        }
    }
</style>
