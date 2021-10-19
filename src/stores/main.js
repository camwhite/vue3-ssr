import { defineStore } from 'pinia'
import ky from 'ky-universal'

export const useMainStore = defineStore({
  // name of the store
  // it is used in devtools and allows restoring state
  id: 'main',
  // a function that returns a fresh state
  state: () => ({
    counter: 0,
    name: 'Cam',
    todos: null,
    error: null
  }),
  // optional getters
  getters: {
    doubleCount() {
      return this.counter * 2
    },
    // use getters in other getters
    doubleCountPlusOne() {
      return this.doubleCount * 2
    }
  },
  // optional actions
  actions: {
    async getTodos() {
      const response = await ky.get('https://jsonplaceholder.typicode.com/todos')
      this.todos = await response.json()
    }
  }
})
