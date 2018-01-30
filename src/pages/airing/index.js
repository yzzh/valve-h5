import { getAirings } from '../../fetchs/airing/index.js';
import footerDownload from '../../components/footer-download/index.vue';

export default {
    name: 'airing',
    data() {
        return {
            items: [],
            airingInfo: '在App里刷广播更快乐'
        }
    },
    components: {
        footerDownload
    },
    created() {
        getAirings().then( res => {
            this.items = res.items.map( v => {
                return v.status
            });
            // console.log('this.items',this.items);
        })
    },
    methods: {
        // getFontIndex(text, end=undefined) {
        //     // 文字的开始位置
        //     let titleStart = text.indexOf('#');
        //     let domainStart = text.indexOf('https');
        //     let result;
        //     // 如果end不传就是要取域名,否则就是取title
        //     if(end === undefined){
        //         result = text.slice(domainStart);
        //     }else if(titleStart > -1 && end !== undefined){
        //         result = `#${text.slice(titleStart + 1, end)}#`;
        //     }
        //     return result;
        // },
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
                // console.log('more items',this.items);
                let data = res.items.map( v => {
                    return v.status;
                })
                this.items = [...this.items, ...data];
            })
        }
    }
}
