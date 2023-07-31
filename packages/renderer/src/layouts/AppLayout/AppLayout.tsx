import { useContext, createEffect, Show } from 'solid-js'
import { AppContext } from '@/App'
import ChatRoom from '@/components/ChatRoom/ChatRoom'
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs'

import Dashboard from '@/components/Dashboard/Dashboard'
import { useSignal } from '@/hooks/signals'
import Icon from '@/components/Icon/Icon'
import Wallet from '@/components/Wallet/Wallet'

import { appLayout, appLayoutContent, breadcrumbNav, closeBtn, fullScreen, sidePanel, sidePanelHandle, sidePanelOpenBtn, walletBtn, walletOpen } from './AppLayout.module.scss'

const AppLayout = () => {
  const { chatMinimized, chatWidth } = useContext(AppContext)
  const open = useSignal(true)
  const isWalletOpen = useSignal(true)

  const handleOpen = () => {
    open.value = true
    chatMinimized.value = false
  }

  const handleClose = () => {
    open.value = false
    chatMinimized.value = true
  }

  const toggleWallet = () => {
    console.log(isWalletOpen.value)
    isWalletOpen.value = !isWalletOpen.value
  }

  createEffect(() => {
    document.documentElement.style.setProperty('--cw', `${chatWidth}%`)
  })

  return (
    <section class={appLayout} classList={{ [fullScreen]: chatMinimized.value }}>
      <div class={appLayoutContent}>
        <Dashboard />
      </div>
      <section class={sidePanel} classList={{ [walletOpen]: isWalletOpen.value }}>
        <div class={sidePanelHandle} />
        <header>
          <Breadcrumbs className={breadcrumbNav} />
          <button class={walletBtn} onClick={toggleWallet}><Icon name="wallet" /></button>
          <button class={closeBtn} onClick={handleClose} title="Close the chatroom."><Icon name="arrowRight" /></button>
        </header>
        {isWalletOpen.value && <Wallet />}
        <Show when={!open.value}>
          <button class={sidePanelOpenBtn} onClick={handleOpen} title="Open the chatroom."><Icon name="chat" /></button>
        </Show>
        <ChatRoom />
      </section>
    </section>
  )
}

export default AppLayout