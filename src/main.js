import { createSSRApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import { createRouter } from './router'

export const createApp = async (
  isServer = import.meta.env.SSR
) => {
  const pinia = createPinia()
  const router = createRouter()

  const app = createSSRApp(App)
  app.use(router).use(pinia)

  return { app, router, pinia }
}
