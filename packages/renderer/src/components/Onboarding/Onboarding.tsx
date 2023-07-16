import { Component, createRenderEffect, createResource, createSignal } from 'solid-js'

import CRCLSLogo from '@/assets/crcls-logo.svg?component-solid'
import Loader from '@/components/Loader/Loader'
import CreateAccount from '@/components/CreateAccount/CreateAccount'
import { waitForReady } from '@/ipc/converse'
import { wait } from '@/utils/async'

import { onboardingPage, exit } from './Onboarding.module.scss'

interface OnboardingProps {
  onComplete: (account: Account) => void
}

const Onboarding: Component<OnboardingProps> = ({ onComplete }) => {
  const [ready, { refetch }] = createResource(waitForReady)
  const [loading, setLoading] = createSignal(true)
  const [noAccount, setNoAccount] = createSignal(true)
  const [fadeOut, setFadeOut] = createSignal(false)

  createRenderEffect(async () => {
    const response = ready()

    if (response) {
      const { account } = response
      if (account !== null && account !== undefined) {
        await wait(1200)
        setFadeOut(() => true)
        await wait(420)
        setNoAccount(false)
        await wait(333)
        onComplete(account)
      }

      setLoading(() => false)
    }
  })

  return (
    <section class={onboardingPage}>
      <span class="crcls-logo" classList={{ [exit]: fadeOut() }}>
        <CRCLSLogo width={33} height={33} viewBox="0 0 33 33" />
        CRCLS
      </span>
      {loading() ? <Loader /> : noAccount() && <CreateAccount onComplete={refetch} />}
    </section>
  )
}

export default Onboarding
