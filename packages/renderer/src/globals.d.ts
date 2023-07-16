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
    host: string
    account?: Account
  }

  interface AccountCreateMessage extends CRCLSMsgBase {
    type: CRCLSMessage.ACCOUNT_CREATE
    address: string
    seedPhrase: string
    balance: number
  }

  type CRCLSMessageUnion =
    ErrorMessage |
    ReadyMessage |
    AccountCreateMessage

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