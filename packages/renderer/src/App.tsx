import { Component, createContext } from 'solid-js'

import TitleBar from '@/components/TitleBar/TitleBar'
import Onboarding from '@/components/Onboarding/Onboarding'
import { SimpleSignal, createNoopSignal, useSignal } from '@/hooks/signals'
import AppLayout from './layouts/AppLayout/AppLayout'

interface AppContextAttrs {
  account?: SimpleSignal<Account>
  circles: SimpleSignal<Circle[]>
  chatWidth: SimpleSignal<number>
  chatMinimized: SimpleSignal<boolean>
  path: SimpleSignal<string[]>
}

export const AppContext = createContext<AppContextAttrs>({
  circles: createNoopSignal([] as Circle[]),
  chatWidth: createNoopSignal(50),
  chatMinimized: createNoopSignal(false),
  path: createNoopSignal(['crcls']),
})

const App: Component = () => {
  const account = useSignal<Account>()
  const circles = useSignal<Circle[]>([])
  const chatWidth = useSignal(50)
  const chatMinimized = useSignal(false)
  const path = useSignal(['crcls'])

  return (
    <AppContext.Provider value={{ account, circles, chatMinimized, chatWidth, path }}>
      <TitleBar />
      {account.value === undefined ? (
        <Onboarding />
      ) : (
        <AppLayout />
      )}
    </AppContext.Provider>
  )
}

export default App
