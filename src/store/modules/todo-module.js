import {todoService} from '../../services/todo-service'

export default {
    state: {
        todos: null,
        filterBy: null
    },
    getters: {
        todos(state) {
            if (!state.filterBy) return state.todos
            const regex = new RegExp(state.filterBy.title, 'i')
            return state.todos.filter(todo => regex.test(todo.title))
        },
    },
    mutations: {
        setFilter(state, {filterBy}) {
            state.filterBy = {...filterBy}
        },
        setTodos(state, {todos}) {
            state.todos = todos
        },
        removeTodo(state, {id}) {
            const idx = state.todos.findIndex((t) => t.id === id)
            state.todos.splice(idx, 1)
        },
        updateTodo(state, {todo}) {
            const idx = state.todos.findIndex((t) => t.id === todo.id)
            state.todos.splice(idx, 1, todo)
        },
        saveTodo(state, {todo}) {
            state.todos.unshift(todo)
        },
    },
    actions: {
        setFilter({commit}, {filterBy}) {
            commit({type: 'setFilter', filterBy})
        },
        async loadTodos({commit}) {
            try {
                const todos = await todoService.query()
                commit({type: 'setTodos', todos})
            } catch (e) {
                console.log('can\'t load todos')
            }
        },
        async removeTodo({commit}, {id}) {
            try {
                await todoService.remove(id)
                commit({type: 'removeTodo', id})
            } catch (e) {
                console.log(e)
            }
        },
        async saveTodo({commit}, {todo}) {
            try {
                const savedTodo = await todoService.save(todo)
                commit({type: 'saveTodo', todo: savedTodo})
            } catch (e) {
                console.log(e)
            }
        },
        async updateTodo({commit}, {todo}) {
            try {
                const updatedTodo = await todoService.update(todo)
                commit({type: 'updateTodo', todo: updatedTodo})
                return updatedTodo
            } catch (e) {
                console.log(e)
            }
        },
        async doneTodo({commit}, {todo}) {
            const updatedTodo = JSON.parse(JSON.stringify(todo))
            updatedTodo.doneAt = Date.now()
            updatedTodo.status = 'done'
            try {
                await todoService.update(updatedTodo)
            } catch (e) {
                console.log(e)
            } finally {
                commit({type: 'saveTodo', todo: updatedTodo})
            }
        },
    },
}
