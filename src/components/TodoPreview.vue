<template>
  <li class="todo-preview">
    <custom-card>
      <template #header>
        <p><span class="fw-bold">Title:</span> {{ todo.title }}</p>
        <p><span class="fw-bold">Description:</span> {{ todo.description }}</p>
        <p><span class="fw-bold">Create At:</span> {{ getCreatedAtDateFormat }}</p>
        <p><span class="fw-bold">Updated At:</span> {{ getDoneAtDateFormat }}</p>
        <p><span class="fw-bold">Status:</span> {{ todo.status }}</p>
      </template>

      <template #footer>
        <div class="btn-group">
          <button @click="goToEdit" class="btn btn-primary">edit</button>
          <button @click="removeTodo(todo.id)" class="btn btn-danger btn">delete</button>
          <button @click="doneTodo(todo)" :class="[todo.updated_at ? 'btn-secondary' : 'btn-info','btn']"
                  :disabled="todo.updated_at">{{ todo.updated_at ? 'Great job!' : 'Done?' }}
          </button>
        </div>
      </template>
    </custom-card>
  </li>
</template>
<script>
import CustomCard from "@/components/CustomCard.vue";

export default {
  name: 'todo-preview',
  props: {
    todo: Object,
  },
  components: {
    CustomCard
  },
  created() {
    console.log(this.todo);
  },
  methods: {
    goToDetail() {
      this.$router.push(`/todo/${this.todo.id}`)
    },
    goToEdit() {
      this.$router.push(`/todo/edit/${this.todo.id}`)
    },
    removeTodo(todoId) {
      this.$emit('removeTodo', todoId)
    },
    doneTodo(todo) {
      this.$emit('doneTodo', todo)
    }
  },
  computed: {
    getCreatedAtDateFormat({todo}) {
      return new Date(todo.created_at).toLocaleString()
    },
    getDoneAtDateFormat({todo}) {
      if (!todo.updated_at) return ''
      return new Date(todo.updated_at).toLocaleString()
    }
  }
}
</script>
