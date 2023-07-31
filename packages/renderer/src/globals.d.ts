import { IpcRendererEvent } from 'electron'

import { CRCLSMessage } from '@/types'

declare global {
  interface Account {
    address: string
    balance: number
    bio: string
    channels: string[] | null
    handle: string
    pfp: string
  }

  interface Circle {
    author: string
    description: string
    id: string
    logo: string
    name: string
    uri: string
  }

  interface Message {
    message: string
    sender: string
    timestamp: number
  }

  interface CRCLSMsgBase {
    type: CRCLSMessage
  }

  interface ErrorMessage extends CRCLSMsgBase {
    type: CRCLSMessage.ERROR
    message: string
  }

  interface ReadyMessage extends CRCLSMsgBase {
    type: CRCLSMessage.READY
    status: string
    account?: Account
    circles: Circle[]
  }

  interface AccountCreateMessage extends CRCLSMsgBase {
    type: CRCLSMessage.ACCOUNT_CREATE
    address: string
    seedPhrase: string
    balance: number
  }

  interface JoinMessage extends CRCLSMsgBase {
    type: CRCLSMessage.JOIN
    channel: string
    history: Message[]
    members: number
  }

  interface ReplyMessage extends CRCLSMsgBase {
    type: CRCLSMessage.REPLY
    message: Message
  }

  type CRCLSMessageUnion =
    ErrorMessage |
    ReadyMessage |
    AccountCreateMessage |
    JoinMessage |
    ReplyMessage

  type CommandHandler<T extends CRCLSMessageUnion> = (e: IpcRendererEvent, response: T) => void

  interface Window {
    CRCLS: {
      sendCommand: (cmd: string, subcmd?: string, data?: string) => void
      on: <T extends CRCLSMessageUnion>(type: CRCLSMessage, cb: CommandHandler<T>) => void
      once: <T extends CRCLSMessageUnion>(type: CRCLSMessage, cb: CommandHandler<T>) => void
      removeListener: <T extends CRCLSMessageUnion>(type: CRCLSMessage, cb: CommandHandler<T>) => void
    }
    frame: {
      minimize: () => void
      maximize: () => void
      close: () => void
    }
  }
}