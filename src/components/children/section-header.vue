<template>
    <header>
        <!--<h2 class="list-name">{{subjectCollection.name}}</h2>-->
        <h2 class="list-name">{{name}}</h2>
        <span class="list-more" @click="toMovieChild()">更多</span>
    </header>
</template>

<script>
    export default {
        name: 'section-header',
        props: {
            // subjectCollection: Object,
            name: String,
            path: String
        },
        methods: {
            toMovieChild() {
                // this.$router.push(Object.values(path));
                // console.log(Object.values(path))
                // window.open(path.url);
                this.$router.push(this.path)
            }
        }
    }
</script>

<style lang="less" scoped>
    .list-name{
        font-size: 17px;
        font-weight: normal;
        color: #111;
        margin: 0;
        text-align: left;
    }
    .list-more{
        position: absolute;
        right: 0;
        top: 0;
        color: #42bd56;
    }
</style>
