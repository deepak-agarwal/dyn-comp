'use client'
import { config } from '@gluestack-ui/config'
import { GluestackUIProvider } from '@gluestack-ui/themed'
import { Suspense } from 'react'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Suspense>
      <GluestackUIProvider config={config}>{children}</GluestackUIProvider>
    </Suspense>
  )
}
