<template>
    <li class="list-item" v-for="item in movieList.collectionItems">
        <a href="javascript:;">
            <div class="list-poster"
                :style="{
                    backgroundImage:`url(${item.cover.url})`,
                }"
                >
            </div>
            <div class="list-title">{{item.title}}</div>
            <!--图标字体 小星星、评分（有评分才存在）-->
            <div class="list-rating" v-if="item.rating !== null">
                <div class="star-color">
                    <div class="star-color-grey">
                        <span class="rating-star" v-for="n in 5">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-xingxing"></use>
                            </svg>
                        </span>
                    </div>
                    <div class="star-color-red">
                        <span class="rating-star-color" v-for="n in getStars(item.rating.value)">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-xingxing"></use>
                            </svg>
                        </span>
                    </div>
                </div>
                <span class="rating-value">{{item.rating.value}}</span>
            </div>
            <!--暂无评分 （rating === null）-->
            <div class="no-rating" v-if="item.rating === null">暂无评分</div>
        </a>
    </li>
</template>
