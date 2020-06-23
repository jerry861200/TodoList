import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const LS = {
  load(){
    return JSON.parse(localStorage.getItem('vue-todos') || '[]')
  },
  save(data){
    localStorage.setItem('vue-todos',JSON.stringify(data))
  }
}

const filter = {
  all(todos){
    return todos
  },
  active(todos){
    return todos.filter((todo)=>{
      return !todo.complete
    })
  },
  complete(todos){
    return todos.filter((todo)=>{
      return todo.complete
    })
  }
}



export default new Vuex.Store({
  //避免小問題
  strict:true,
  //初始之資料
  state: {
    todos: [
      {content:"todo-contnet",complete:false},
      {content:"todo-contnet",complete:true},
      {content:"todo-contnet",complete:false}
    ]
  },
  //參數是state
  getters:{
    todoIndex(state){
      //中括號處理屬性名稱
      return filter[state.route.name](state.todos).map(todo=>{
        return state.todos.indexOf(todo)
      })
    }
  },
  //動作 參數是state
  mutations: {
    SET_TODOS(state, data) {
      state.todos = data
      // save LS
      LS.save(state.todos)
    },
    ADD_TODO(state,data){
      state.todos.push(data)
      LS.save(state.todos)
    },
    UPDATE_TODO(state,{ index, data}){
      state.todos[index].complete = data.complete
      state.todos[index].content = data.content
      LS.save(state.todos)
    },
    REMOVE_TODO(state,index){
      state.todos.splice(index,1)
      LS.save(state.todos)
    }
  },
  //異步的動作
  actions: {
    INIT_TODOS({commit}){
      //load LS
      commit('SET_TODOS', LS.load())
    }
  },
  modules: {
  }
})
