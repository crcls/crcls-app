import { CRCLSMessage } from "@/types"

export function sendCommand<T extends CRCLSMessageUnion>(cmd: CRCLSMessage, data?: string): Promise<T> {
  let command = cmd.toString()
  let subcmd: string

  if (command.includes('-')) {
    [command, subcmd] = command.split('-')
  }

  return new Promise((resolve, reject) => {
    const handleResponse: CommandHandler<CRCLSMessageUnion> = (_, response) => {
      if (response.type === CRCLSMessage.ERROR) {
        reject(response)
        window.CRCLS.removeListener(cmd, handleResponse)
      } else {
        resolve(response as T)
        window.CRCLS.removeListener(CRCLSMessage.ERROR, handleResponse)
      }
    }
    window.CRCLS.once<T>(cmd, handleResponse)
    window.CRCLS.once<ErrorMessage>(CRCLSMessage.ERROR, handleResponse)
    window.CRCLS.sendCommand(command, subcmd, data)
  })
}

export function waitForReady(): Promise<ReadyMessage> {
  return sendCommand<ReadyMessage>(CRCLSMessage.READY)
}
