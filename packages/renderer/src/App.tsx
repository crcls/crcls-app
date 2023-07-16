import { Component } from 'solid-js'

import TitleBar from '@/components/TitleBar/TitleBar'
import Onboarding from '@/components/Onboarding/Onboarding'
import AccountManager from '@/components/AccountManager/AccountManager'
import { useSignal } from '@/hooks/signals'

const App: Component = () => {
  const account = useSignal<Account>()

  const handleComplete = (acc: Account) => {
    account.value = acc
  }

  return (
    <>
      <TitleBar />
      {account.value === undefined ? (
        <Onboarding onComplete={handleComplete} />
      ) : (
        <AccountManager account={account.valueOrDie} />
      )}
    </>
  )
}

export default App
