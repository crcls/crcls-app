import MessageForm from '@/components/MessageForm'

import { chatRoom, messages } from './ChatRoom.module.scss'

const ChatRoom = () => {
  return (
    <section class={chatRoom}>
      <div class={messages}></div>
      <MessageForm />
    </section>
  )
}

export default ChatRoom
