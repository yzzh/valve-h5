<template>
    <header>
        <h2 class="list-name">{{name}}</h2>
        <span class="list-more" @click="toMovieChild()">更多</span>
    </header>
</template>

<script>
    export default {
        name: 'section-header',
        props: {
            name: String,
            path: String,
            clickType: {
                type: Number,
                default: 0 // 不传默认是0，其他值比如1的时候改变事件
            }
        },
        methods: {
            toMovieChild() {
                if(this.clickType === 0){
                    this.$router.push(this.path);
                    return;
                };
                if(this.clickType === 1){
                    window.open(this.path);
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    .list-name{
        font-size: 34px;/*px*/
        font-weight: normal;
        color: #111;
        margin: 0;
        text-align: left;
    }
    .list-more{
        font-size: 28px;/*px*/
        position: absolute;
        right: 0;
        top: 0;
        color: #42bd56;
    }
</style>
