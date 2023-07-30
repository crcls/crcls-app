import { useContext, createEffect } from 'solid-js'
import { AppContext } from '@/App'
import ChatRoom from '@/components/ChatRoom/ChatRoom'

import { appLayout, appLayoutContent, fullScreen } from './AppLayout.module.scss'
import Dashboard from '@/components/Dashboard/Dashboard'

const AppLayout = () => {
  const { chatMinimized, chatWidth } = useContext(AppContext)

  createEffect(() => {
    document.documentElement.style.setProperty('--cw', `${chatWidth}%`)
  })

  return (
    <section class={appLayout} classList={{ [fullScreen]: chatMinimized.value }}>
      <div class={appLayoutContent}>
        <Dashboard />
      </div>
      <ChatRoom />
    </section>
  )
}

export default AppLayout