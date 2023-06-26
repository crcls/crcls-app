import { JSX, createSignal } from 'solid-js'
import { messageForm, inputWrapper, textInput } from './MessageForm.module.scss'

const MessageForm = () => {
  const [message, setMessage] = createSignal('')

  const handleKeyPress: JSX.EventHandler<HTMLTextAreaElement, KeyboardEvent>  = (e) => {
    if (e.key === 'Enter' && !e.shiftKey && message() !== '') {
      e.preventDefault()
      console.log(message())
      setMessage('')
    }
  }
  
  return (
    <section class={messageForm}>
      <div class={inputWrapper}>
        <textarea value={message()} class={textInput} name="msg" onInput={(e) => setMessage(e.target.value)} onKeyDown={handleKeyPress} />
      </div>
    </section>
  )
}

export default MessageForm
