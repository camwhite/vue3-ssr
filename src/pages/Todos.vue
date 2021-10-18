<template>
  <h1>{{ main.name }}</h1>
  <button @click="updateCount" class="w-48 bg-blue-200">
    Store state count: {{ counter }}
  </button>
  <div class="flex items-center" v-for="todo of todos">
    <input type="checkbox" class="mr-2" />
    <p>{{ todo.title }}</p>
  </div>
</template>

<script>
import { computed, onServerPrefetch } from 'vue'
import { useMainStore } from '../stores/main'

export default {
  async setup() {
    const main = useMainStore()

    onServerPrefetch(async () => {
      await main.getTodos()
    })
    if (!main.todos) {
      await main.getTodos()
    }

    const counter = computed(() => main.counter)
    const todos = computed(() => main.todos)

    const updateCount = () => {
      main.counter++
    }

    return {
      main,
      counter,
      todos,
      updateCount
    }
  }
}
</script>

<style></style>
