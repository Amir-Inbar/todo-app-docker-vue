<template>
  <section class="todo-app container flex flex-col gap-1">
    <button @click="goToEdit" class="btn btn-secondary">Add a new todo</button>
    <todo-filter @setFilter="setFilter"/>
    <todo-list @doneTodo="doneTodo" @removeTodo="removeTodo" v-if="todosToShow" :todos="todosToShow"/>
  </section>
</template>

<script>
import todoFilter from '../components/TodoFilter.vue'
import todoList from '../components/TodoList.vue'

export default {
  name: 'todo-app',
  components: {
    todoList,
    todoFilter,
  },
  methods: {
    setFilter(filterBy) {
      this.$store.dispatch({type: 'setFilter', filterBy})
    },
    goToEdit() {
      this.$router.push(`/todo/edit`)
    },
    removeTodo(todoId) {
      this.$store.dispatch({type: 'removeTodo', id: todoId})
    },
    doneTodo(todo) {
      this.$store.dispatch({type: 'doneTodo', todo})
    },
  },
  computed: {
    todosToShow() {
     return this.$store.getters.todos
    },
  },
}
</script>
