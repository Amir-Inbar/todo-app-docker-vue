<template>
  <section class="todo-filter">
    <input
      v-model="filterBy.title"
      @input="setFilter"
      type="text"
      class="form-input"
      placeholder="Search vendor..."
    />
  </section>
</template>

<script>
export default {
  name: 'todo-filter',
  data() {
    return {
      filterBy: {
        title: '',
      },
    }
  },
  methods: {
    setFilter() {
      this.$emit('setFilter', this.filterBy)
    },
  },
}
</script>
