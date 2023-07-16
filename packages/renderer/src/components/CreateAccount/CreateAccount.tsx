import { Component, JSXElement, batch, createMemo, createSignal } from 'solid-js'

import { sendCommand } from '@/ipc/converse'
import { resolver, wait } from '@/utils/async'
import { CRCLSMessage } from '@/types'
import Loader from '@/components/Loader'

import { createAccountPanel, exit, seedPhrase, seedPhraseWords } from './CreateAccount.module.scss'

interface NewAccount {
  address: string
  seedPhrase: string
  balance: number
}

function accountFromResponse(msg: AccountCreateMessage): NewAccount {
  const { type, ...account } = msg
  if (type !== CRCLSMessage.ACCOUNT_CREATE) throw new Error('Malformed message.')

  return account
}

interface CreateAccountProps {
  onComplete: () => void
}

const CreateAccount: Component<CreateAccountProps> = ({ onComplete }) => {
  const [err, setErr] = createSignal<Error | undefined>()
  const [account, setAccount] = createSignal<NewAccount | undefined>()
  const [loading, setLoading] = createSignal(false)
  const [fadeOut, setFadeOut] = createSignal(false)
  const seedWords = createMemo<JSXElement[]>(() => {
    const acc = account()
    if (acc === undefined) return []
    return acc.seedPhrase.split(/\s/).map((word) => <span>{word}</span>)
  })

  const createDefault = async () => {
    setLoading(() => true)
    const [e, result] = await resolver<AccountCreateMessage>(sendCommand(CRCLSMessage.ACCOUNT_CREATE))

    if (e !== undefined || result === undefined) {
      setErr(() => e)
      setLoading(() => false)
      return
    }

    const account = accountFromResponse(result)
    batch(() => {
      setAccount(() => account)
      setLoading(() => false)
    })
  }

  const handleAccept = async () => {
    onComplete()
    await wait(333)
    setFadeOut(() => true)
  }

  return (
    <section class={createAccountPanel} classList={{ [exit]: fadeOut() }}>
      {err() !== undefined && <p class="error">{err()?.message}</p>}
      {loading() && <Loader />}
      {account() === undefined && !loading() && (
        <button class="btn btn-block" onClick={createDefault}>
          JOIN
        </button>
      )}
      {seedWords().length > 0 && (
        <div class={seedPhrase}>
          <h2 class="text-center">Save your seed phrase.</h2>
          <p class="text-center">
            If you lose your account access for any reason,
            <br />
            this is the <strong>ONLY</strong> way to recover it.
          </p>
          <div class={seedPhraseWords}>{seedWords()}</div>
          <button class="btn btn-block" onClick={handleAccept}>
            I have saved them. Let's go
          </button>
        </div>
      )}
    </section>
  )
}

export default CreateAccount
