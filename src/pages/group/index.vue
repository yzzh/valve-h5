<template>
    <div class="group-root">
        <section class="group-section" v-for="group in allGroups">
            <header>{{group.name}}</header>
            <ul class="group-content">
                <li v-for="item in group.groups">
                    <a href="">
                        <div class="group-meta">
                            <img :src="item.avatar" alt="">
                            <span class="group-name">{{item.name}}</span>
                            <span class="group-member">{{item.member_count}}</span>
                        </div>
                        <div class="group-topic">{{item.desc_abstract}}</div>
                    </a>
                </li>
            </ul>
            <div class="more-group">更多相关小组</div>
        </section>
        <footerDownload :info="info"></footerDownload>
    </div>
</template>

<script>
    import { getGroups } from '../../fetchs/group/index.js';
    import footerDownload from '../../components/footer-download/index.vue';

    export default {
        name: 'group',
        data() {
            return {
                allGroups: [],
                info: '我们的精神角落'
            }
        },
        created() {
            getGroups().then(res => {
                console.log(res);
                const allGroups = res.rec_groups[0].classified_groups; // 数组,包括所有类型的group
                console.log('allGroups', allGroups);
                this.allGroups = allGroups
            })
        },
        components: {
            footerDownload
        }
    }
</script>

<style lang="less" scoped>
    @import './style.less';
</style>
