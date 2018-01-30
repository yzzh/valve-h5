<template>
    <section class="movie-list">
        <sectionHeader
            :subjectCollection="movieList.subject_collection"
            :path="morePath"
            ></sectionHeader>
        <div class="section-content">
            <ul class="list-items">
                <listItem v-for="(item,index) in movieList.subject_collection_items"
                    :item="item"
                    :key="index"></listItem>
            </ul>
        </div>
    </section>
</template>

<script>
    import sectionHeader from './children/section-header.vue';
    import listItem from './children/list-item.vue';

    export default {
        name: 'movie-section',
        data() {
            return {
            }
        },
        components: {
            sectionHeader,
            listItem
        },
        props: {
            movieList: Object,
            morePath: String,
        }
    }
</script>

<style lang="less" scoped>
    @import './style.less';
</style>
