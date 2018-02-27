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
// https://m.douban.com/rexxar/api/v2/group/rec_groups_by_tag?tag=%E6%96%B0%E7%BB%84%E9%80%9F%E6%8A%A5&start=0&count=25&ck=&for_mobile=1
// https://m.douban.com/rexxar/api/v2/group/rec_groups_by_tag?tag=%E5%BD%B1%E8%A7%86&start=0&count=25&ck=&for_mobile=1
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
