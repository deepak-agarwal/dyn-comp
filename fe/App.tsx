import { config } from '@gluestack-ui/config'
import { Box, GluestackUIProvider, Text } from '@gluestack-ui/themed'
import { Suspense } from 'react'
import Home from './app/views/home'

export default function App() {
  return (
    <Suspense>
      <GluestackUIProvider config={config}>
        <Home />
      </GluestackUIProvider>
    </Suspense>
  )
}
