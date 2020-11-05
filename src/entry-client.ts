import { createApp } from '@/app.ts'

const { app, router } = createApp()
router.isReady().then(() => {
  app.mount('#app', true)
})
