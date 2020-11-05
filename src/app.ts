import { createSSRApp, h } from 'vue'
import App from '@/App.vue'
import 'reflect-metadata'
import router from '@/router'

export const createApp = () => {
  const rootComponent = {
    render: () => h(App),
    components: { App }
  }
  const app = createSSRApp(rootComponent).use(router)
  return { app, router }
}
