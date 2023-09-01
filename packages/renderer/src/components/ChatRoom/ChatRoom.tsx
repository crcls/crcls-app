import { For, JSX, createEffect, createResource, onCleanup, useContext } from 'solid-js'

import { useSignal } from '@/hooks/signals'
import { AppContext } from '@/App'
import MessageForm from '@/components/MessageForm'
import { listenForReplies, sendCommand } from '@/ipc/converse'
import { CRCLSMessage } from '@/types'
import { wait } from '@/utils/async'

import { chatRoom, messageView } from './ChatRoom.module.scss'
import Reply from './Reply'

const ChatRoom = () => {
  const { path } = useContext(AppContext)
  const [ready] = createResource<JoinMessage>(() => sendCommand(CRCLSMessage.JOIN, '/' + path.valueOrDie.join('/')))
  const messages = useSignal<Message[]>([])
  const scrollView = useSignal<HTMLDivElement | null>(null)
  const smoothScroll = useSignal(false)
  const following = useSignal(true)
  const cancel = useSignal<(() => void)>()

  const trackScroll = (e: UIEvent) => {
    const { scrollTop, clientHeight, scrollHeight } = e.currentTarget as Element
    const st = scrollHeight - clientHeight - 60

    if (scrollTop < st && following.peek) {
      following.value = false
    } else if (scrollTop >= st && !following.peek) {
      following.value = true
    }
  }

  const gotoBottom = async () => {
    const elem = scrollView.value
    if (elem) {
      elem.scrollTop = elem.scrollHeight
    }
  }

  createEffect(async () => {
    if (!ready.loading) {
      const response = ready()

      if (response) {
        messages.value = response.history

        await wait(100)
        gotoBottom()

        cancel.value = listenForReplies((reply) => {
          const msgs = messages.vod
          const i = msgs.findLastIndex((m) => m.timestamp > reply.message.timestamp)

          if (i < 0) {
            messages.value = [...msgs, reply.message]
          } else {
            messages.value = [...msgs.slice(0, i), reply.message, ...(i < msgs.length - 1 ? msgs.slice(i, msgs.length - 1) : [])]
          }

          if (!smoothScroll.peek) smoothScroll.value = true

          // TODO: trim messages based on device vitals
          // - detect memory and cpu usage and set the length accoding to some predefined values.

          if (following.peek) {
            gotoBottom()
          }
        })
      }
    }
  })

  onCleanup(() => {
    if (!cancel.isUndefined) cancel.valueOrDie()
  })

  return (
    <section class={chatRoom}>
      <div class={messageView} classList={{ 'smooth-scroll': smoothScroll.value && following.value }} ref={elem => { scrollView.value = elem }} onScroll={trackScroll}>
        <For<Message[], JSX.Element> each={messages.valueOrDie}>
          {(msg) => <Reply msg={msg} />}
        </For>
      </div>
      <MessageForm />
    </section>
  )
}

export default ChatRoom
