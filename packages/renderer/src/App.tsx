import { Component, createMemo, createResource } from 'solid-js'

import CRCLSLogo from '@/assets/crcls-logo.svg?component-solid'
import TitleBar from '@/components/TitleBar/TitleBar'
import Loader from '@/components/Loader/Loader'
import CreateAccount from '@/components/CreateAccount/CreateAccount'
import { waitForReady } from '@/ipc/converse'

import { splashPage } from './App.module.scss'

const App: Component = () => {
  const [ready] = createResource(waitForReady)
  const member = createMemo(() => {
    return ready()?.member
  })

  return (
    <>
      <TitleBar />
      {member() === undefined && (
        <section class={splashPage}>
          <span class="crcls-logo">
            <CRCLSLogo width={33} height={33} viewBox="0 0 33 33" />
            CRCLS
          </span>
          {ready.loading ? <Loader /> : member() === undefined && <CreateAccount />}
        </section>
      )}
    </>
  )
}

export default App
