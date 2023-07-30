import { Show, useContext } from 'solid-js'

import { useSignal } from '@/hooks/signals'
import { AppContext } from '@/App'
import MessageForm from '@/components/MessageForm'

import { breadcrumbNav, chatRoom, chatRoomCont, chatRoomHandle, chatRoomMin, chatRoomOpenBtn, close, closeBtn, messages } from './ChatRoom.module.scss'
import Icon from '../Icon/Icon'
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs'

const ChatRoom = () => {
  const { chatMinimized } = useContext(AppContext)
  const open = useSignal(true)

  const handleOpen = () => {
    open.value = true
    chatMinimized.value = false
  }

  const handleClose = () => {
    open.value = false
    chatMinimized.value = true
  }

  return (
    <section class={chatRoom} classList={{ [chatRoomMin]: chatMinimized.value, [close]: !open.value }}>
      <Show when={!open.value}>
        <button class={chatRoomOpenBtn} onClick={handleOpen} title="Open the chatroom."><Icon name="chat" /></button>
      </Show>
      <div class={chatRoomHandle} />
      <header>
        <Breadcrumbs className={breadcrumbNav} />
        <button class={closeBtn} onClick={handleClose} title="Close the chatroom."><Icon name="arrowRight" /></button>
      </header>
      <div class={chatRoomCont}>
        <div class={messages}></div>
        <MessageForm />
      </div>
    </section>
  )
}

export default ChatRoom
