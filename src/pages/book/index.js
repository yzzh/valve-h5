import { getBookFiction, getBookNonfiction, getValveBookshop } from '../../fetchs/book/index.js';
import bookSection from '../../components/book-section/index.vue';
import sectionHeader from '../../components/children/section-header.vue';
import listItem from '../../components/children/list-item.vue';
import typeSection from '../../components/type-section/index.vue';
import findSection from '../../components/find-section/index.vue';
import { typeList, findList } from './data';
import footerDownload from '../../components/footer-download/index.vue';

export default {
    name: 'book',
    data() {
        return {
            fiction: {
                url: '/book/hotfiction',
                headerName: '最受关注图书｜虚构类',
                // subject_collection: {},
                // subject_collection_items: [] // 是否因为这行数据是需要向请求来的数据中塞向模板中的第一行，所以不屑就报错？？
            },
            nonFiction: {
                url: '/book/hotnonfiction',
                headerName: '最受关注图书｜非虚构类',
                // subject_collection: {},
                subject_collection_items: []
            },
            valveBookshop: {
                url: '/book/bookshop',
                headerName: '豆瓣书店',
                header: {
                    cover: {}
                },
                subject_collection_items: []
            },
            typeList,
            findList,
            info: '我们的精神角落'
        }
    },
    components: {
        bookSection,
        sectionHeader,
        listItem,
        typeSection,
        findSection,
        footerDownload
    },
    async created() {
        // getBookFiction()本身返回的是个Promise对象，若单个获取数据需要用到.then()的方法，其中的参数即为请求到的数据
        // getBookFiction().then(res=>{
        //     console.log(res)
        // })
        const [fiction, nonFiction, valveBookshop] = await Promise.all([
            getBookFiction(),
            getBookNonfiction(),
            getValveBookshop()
        ]);
        Object.assign(this.fiction, fiction);
        Object.assign(this.nonFiction, nonFiction);
        Object.assign(this.valveBookshop, valveBookshop);
        console.log('虚构类', this.fiction);
        console.log('非虚构类', this.nonFiction);
        console.log('豆瓣书店', this.valveBookshop)
    }
}
