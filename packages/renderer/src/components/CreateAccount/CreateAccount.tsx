import { sendCommand } from "@/ipc/converse"
import { createAccountPanel } from "./CreateAccount.module.scss"
import { resolver } from "@/utils/async"
import { createSignal } from "solid-js"

interface NewAccount {
  type: string
  address: string
  seedPhrase: string
  balance: number
}

const CreateAccount = () => {
  const [errState, setErr] = createSignal<Error | undefined>()
  const [accountState, setAccount] = createSignal<NewAccount | undefined>()

  const createDefault = async () => {
    const [e, result] = await resolver<NewAccount>(sendCommand('account', 'create'))

    if (e !== undefined || result === undefined) {
      setErr(() => e)
      return
    }

    setAccount(result)
  }

  const err = errState()
  const account = accountState()

  return (
    <section class={createAccountPanel}>
      {err !== undefined && <p class="error">{err.message}</p>}
      {account === undefined && <button class="btn btn-block" onClick={createDefault}>Join</button>}
      {account !== undefined && <div>{account.seedPhrase}</div>}
    </section>
  )
}

export default CreateAccount
