<template>
    <footer class="download-app">
        <div class="app-logo">
            <img src="../../assets/douban-app-logo.png" alt="">
            <div class="logo-content">
                <strong>豆瓣</strong>
                <p>{{info}}</p>
            </div>
        </div>
        <a href="https://www.douban.com/doubanapp/card/log?category=guangbo&cid=&action=click_download&ref=http%3A//www.douban.com/doubanapp/app%3Fchannel%3Dcard_guangbo%26direct_dl%3D1">
            去 App Store 免费下载 iOS 客户端
        </a>
    </footer>
</template>

<script>
    export default {
        name: 'footer-download',
        props: {
            info: {
                type: String,
                required: true
            }
        }
    }
</script>

<style lang="less" scoped>
.download-app{
    font-size: 30px;/*px*/
    text-align: center;
    padding: 100px 0 100px 0;
    .app-logo{
        margin: 0 auto 30px auto;
        font-size: 28px;/*px*/
        color: #111;
        text-align: left;
        display: inline-block;
        overflow: hidden;
        img{
            width: 96px;
            float: left;
            margin-right: 24px;
        }
        .logo-content{
            float: left;
            strong{
                font-size: 48px;/*px*/
                font-weight: normal;
            }
        }
    }
    a{
        color: #42bd56;
        display: block;
    }
}
</style>
