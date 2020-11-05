import { createSSRApp, h } from 'vue'
import App from '@/App.vue'

export const createApp = () => {
  const rootComponent = {
    render: () => h(App),
    components: { App }
  }
  const app = createSSRApp(rootComponent)
  return { app }
}
