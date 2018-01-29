<template>
    <div ref="root" class="index">
        <section class="banner-cover">
            <div class="banner-bg">
                <img src="https://img3.doubanio.com/f/talion/fbcb08987a36258354c6037211d94286bef9716c/pics/card/promotion_bg.jpg" alt="">
            </div>
            <div class="banner-text">
                <div class="text-title">打开App，回复广播</div>
                <div class="text-btn">
                    <span class="btn-download">极速下载</span>
                    <span class="btn-open">打开</span>
                </div>
            </div>
        </section>
        <section class="status-cover">
            <div class="status-editor">
                <!--用户头像-->
                <span>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-yonghutouxiang"></use>
                    </svg>
                </span>
                <span>登录发广播</span>
                <!--笔-->
                <span>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-iconset0137"></use>
                    </svg>
                </span>
                <!--照相机-->
                <span>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-camera_icon"></use>
                    </svg>
                </span>
            </div>
            <ul class="status-list">
                <li class="status-item" v-for="item in items">
                    <!--包含作者、时间、图片-->
                    <div class="status-top">
                        <div class="top-author">
                            <a class="author-avatar" href="javascript:;" >
                                <img :src="item.author.avatar" alt="">
                            </a>
                            <a href="">
                                <strong class="author-name">{{item.author.name}}</strong>
                                <span class="status-activity">{{item.activity}}</span>
                                <div class="time">{{item.create_time}}</div>
                            </a>
                        </div>
                        <!--（若status.card === null则此项包含）-->
                        <div class="top-text" v-if="item.card === null">
                            <template v-for="text in getFont(item.text)">
                                <a class="text-title" href="" v-if="text.type === 1">{{text.value}}</a>
                                <a class="text-title" href="" v-if="text.type === 2">{{text.value}}</a>
                                <template v-if="text.type === 3">{{text.value}}</template>
                            </template>


                        </div>
                    </div>
                    <!--包含大图片（若status.card === null则此项包含））-->
                    <div class="status-img" v-if="item.card === null && item.images[0] !== undefined"
                        :style="{
                            backgroundImage: `url(${item.images[0].normal.url})`,
                            height: `${item.images[0].normal.height}px`,
                            width: `${item.images[0].normal.width}px`
                        }">
                        <!--<img :src="item.images[0].normal.url" alt="">-->
                    </div>
                    <!--包含卡片文字及图片（若status.card !== null则此项包含）'）-->
                    <div class="status-card" v-if="item.card !== null">
                        <a class="card-cover" href="javascript:;">
                            <div class="card-title">{{item.card.title}}</div>
                            <!--<div class="card-subtitle ">-->
                            <div :class="[item.card.image !== null ? 'card-subtitle-img' : '', 'card-subtitle']">
                                <span class="subtitle-desc">{{item.card.subtitle}}</span>
                                <span class="subtitle-img" v-if="item.card.image !== null"
                                    :style="{
                                        backgroundImage: `url(${item.card.image['normal'].url})`,
                                        height: `${item.card.image.normal.height}px`,
                                        width: `${item.card.image.normal.width}px`
                                    }"
                                    ></span>
                            </div>
                        </a>
                    </div>
                    <!--包含点赞，评论，分享，更多-->
                    <div class="status-bottom">
                        <span>
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-chakandianzan"></use>
                            </svg>
                            {{item.like_count}}
                        </span>
                        <span>
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-pinglun"></use>
                            </svg>
                            {{item.comments_count}}
                        </span>
                        <span>
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-iconfontzhizuobiaozhun20"></use>
                            </svg>
                            {{item.reshares_count}}
                        </span>
                        <span class="more">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-gengduo"></use>
                            </svg>
                        </span>
                    </div>
                </li>
                <button class="btn-more-airing" @click="getMoreAiring(items[items.length - 1].id)">显示更多广播</button>
            </ul>
        </section>
        <div class="download-app">
            <div class="app-logo">
                <img src="../../assets/douban-app-logo.png" alt="">
                <div class="logo-content">
                    <strong>豆瓣</strong>
                    <p>在App里刷广播更快乐</p>
                </div>
            </div>
            <a href="https://www.douban.com/doubanapp/card/log?category=guangbo&cid=&action=click_download&ref=http%3A//www.douban.com/doubanapp/app%3Fchannel%3Dcard_guangbo%26direct_dl%3D1">
                去 App Store 免费下载 iOS 客户端
            </a>
        </div>

    </div>
</template>


<script>
    import { getAirings } from '../../fetchs/airing/index.js';

    export default {
        name: 'airing',
        data() {
            return {
                items: []
            }
        },
        created() {
            getAirings().then( res => {
                this.items = res.items.map( v => {
                    return v.status
                });
                console.log('this.items',this.items);
            })
        },
        methods: {
            getFontIndex(text, end=undefined) {
                // 文字的开始位置
                let titleStart = text.indexOf('#');
                let domainStart = text.indexOf('https');
                let result;
                // 如果end不传就是要取域名,否则就是取title
                if(end === undefined){
                    result = text.slice(domainStart);
                }else if(titleStart > -1 && end !== undefined){
                    result = `#${text.slice(titleStart + 1, end)}#`;
                }
                return result;
            },
            getFont(text) {
                let textArray = text.split(' ');
                return textArray.map( v => {
                    if(v.slice(0, 1) === '#'){
                        return {
                            value : v,
                            type : 1
                        }
                    }else if(v.slice(0, 4) === 'http'){
                        return {
                            value : v,
                            type : 2
                        }
                    }else{
                        return {
                            value : v,
                            type : 3
                        }
                    }
                })
            },
            getMoreAiring(id) {
                getAirings({
                    max_id : id
                }).then( res => {
                    console.log('more items',this.items);
                    let data = res.items.map( v => {
                        return v.status;
                    })
                    this.items = [...this.items, ...data];
                })
            }
        }
    }
</script>

<style lang="less">
    @import './style.less';
</style>
