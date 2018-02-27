import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 每个应用仅仅包含一个store实例
export default new Vuex.Store({
    state: {
        count: 0,
        todos: [
            { id: 1, text: 'true的文本', done: true },
            { id: 2, text: 'false的文本', done: false }
        ]
    },
    getters: {
        doneTodos: state => {
            return state.todos.filter(todo => todo.done)
        },
        doneTodosCount: (state, getters) => {
            return getters.doneTodos.length
        },
        getTodoById: (state) => (id) => {
            return state.todos.find(todo => todo.id === id)
        }
    },
    // mutation可理解为注册事件，只包含同步操作
    mutations: {
        // ES5 风格的计算属性命名功能来使用一个常量作为函数名,多人协作的项目中会很有帮助
        [INCREMENT] (state, payload) {
            state.count += payload.amount
        },
        // [INCREMENT] (state) {
        //     state.count ++
        // },
        [INSERT_TODO] (state, todo) {
            // 以新对象替换老对象，state.obj = { ...state.obj, newProp: 123 }
            state.todos = [ ...state.todos, todo ]
        }
    },
    // action可理解为派发事件,提交mutation，但是不直接变更状态，可包含异步操作
    actions: {
        [INCREMENT]({commit},A){
            commit('increment', A);
        }
    }
})
