import { createApp } from './main'
import './register-service-worker'

createApp().then(({ app, router, pinia }) => {
  const storeInitialState = window.__pinia
  if (storeInitialState) {
    pinia.state.value = storeInitialState
  }

  router.isReady().then(() => {
    app.mount('#app')
  })
})
