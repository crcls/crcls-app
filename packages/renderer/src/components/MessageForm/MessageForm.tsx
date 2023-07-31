import { JSX, useContext } from 'solid-js'

import { useSignal } from '@/hooks/signals'

import { messageForm, inputWrapper, textInput, multiLine } from './MessageForm.module.scss'
import { sendCommand } from '@/ipc/converse'
import { CRCLSMessage } from '@/types'
import { AppContext } from '@/App'

const MAX_HEIGHT = 300

const MessageForm = () => {
  const { path } = useContext(AppContext)
  const message = useSignal('')
  const isMulti = useSignal(false)

  const handleKeyPress: JSX.EventHandler<HTMLTextAreaElement, KeyboardEvent> = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      const msg = message.vod
      if (msg === '') return

      sendCommand(CRCLSMessage.REPLY, msg.replace('\n', '\\n'))
      message.value = ''
    }

    const elem = e.currentTarget
    elem.style.height = ''

    isMulti.value = elem.scrollHeight > 26
    elem.style.height = Math.min(elem.scrollHeight, MAX_HEIGHT) + 'px'
  }

  return (
    <section class={messageForm}>
      <div class={inputWrapper} classList={{ [multiLine]: isMulti.value }}>
        <textarea
          placeholder={`Message #${path.vod[path.vod.length - 1]}`}
          value={message.value}
          class={textInput}
          name="msg"
          onInput={(e) => { message.value = e.target.value }}
          onKeyDown={handleKeyPress}
          rows={1}
          style={{ height: '26px' }}
        />
      </div>
    </section>
  )
}

export default MessageForm
