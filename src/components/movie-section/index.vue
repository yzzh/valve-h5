<template>
    <section class="movie-list">
        <header>
            <h2 class="list-name">{{movieList.subject_collection.name}}</h2>
            <span class="list-more">更多</span>
        </header>
        <div class="section-content">
            <ul class="list-items">
                <listItem v-for="item in movieList.subject_collection_items" :item="item"></listItem>
            </ul>
        </div>
    </section>
</template>

<script>
    import listItem from './children/list-item.vue';

    export default {
        name: 'movie-section',
        data() {
            return {

            }
        },
        components: {
            listItem
        },
        props: {
            movieList: {
                collection: {
                    type: Object
                },
                collectionItems: Array
            },
        },
        // methods: {
        //     getStars(value) {
        //         let result;
        //         if (value > 0 && value <= 2){
        //             result = 1;
        //         }else if(value <= 4){
        //             result = 2;
        //         }else if(value <= 6){
        //             result = 3;
        //         }else if(value <= 9){
        //             result = 4;
        //         }else{
        //             result = 5;
        //         }
        //         return result;
        //     }
        // }
    }
</script>

<style lang="less" scoped>
    @import './style.less';
</style>
