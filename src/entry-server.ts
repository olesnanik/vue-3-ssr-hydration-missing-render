import { createApp } from '@/app'

export default async (ctx: { url: string }) => {
  const { app, router } = createApp()
  await router.push(ctx.url)
  await router.isReady()
  return app
}
