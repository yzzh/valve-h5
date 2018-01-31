<template>
    <section class="find-section">
        <header>{{findList.header}}</header>
        <div class="find-content">
            <ul class="find-items">
                <template v-for="find in findList.items" >
                    <li
                        :style="{border: `1px solid ${find.color}`}"
                        >
                        <a href=""
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
        padding-top: 10px;
        header{
            font-size: 17px;
            font-weight: normal;
            color: #111;
            margin: 0;
            text-align: left;
            margin: 0 18px;
        }
        .find-content{
            margin-bottom: -18px;
            .find-items{
                overflow-x: auto;
                font-size: 0;
                white-space: nowrap;
                padding: 15px 0px 43px 0px;
                margin-left: 18px;
                li{
                    display: inline-block;
                    margin: 0px 8px 8px 0px;
                    border-radius: 2px;
                    border: solid 1px;
                    a{
                        display: block;
                        padding: 0 24px;
                        height: 50px;
                        line-height: 50px;
                        font-size: 15px;
                        overflow: auto;
                    }
                }
                .br-line{
                    display: block;
                    height: 1px;
                    border: 0;
                    margin: 0;
                    width: 100%;
                }
            }
        }
    }
</style>
