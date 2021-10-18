import {
  createRouter as _createRouter,
  createWebHistory,
  createMemoryHistory
} from 'vue-router'
import Home from './pages/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/todos',
    name: 'Todos',
    component: () => import('./pages/Todos.vue')
  },
  {
    path: '/collections/:handle',
    name: 'Collection',
    component: () => import('./pages/Collection.vue')
  }
]

export const createRouter = (isServer = import.meta.env.SSR) => {
  const history = isServer
    ? createMemoryHistory()
    : createWebHistory()

  return _createRouter({
    history,
    routes
  })
}
