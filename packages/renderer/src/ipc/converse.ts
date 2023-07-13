import { CRCLSMessage } from "@/types"

export function sendCommand<T extends CRCLSMessageUnion>(cmd: CRCLSMessage, data?: string): Promise<T> {
  let command = cmd.toString()
  let subcmd: string

  if (command.includes('-')) {
    [command, subcmd] = command.split('-')
  }

  return new Promise((resolve, reject) => {
    window.CRCLS.once<T>(cmd, (_, response) => {
      if (response.type === CRCLSMessage.ERROR) {
        reject(response.message)
      } else {
        resolve(response)
      }
    })
    window.CRCLS.sendCommand(command, subcmd, data)
  })
}

export function waitForReady(): Promise<ReadyMessage> {
  return sendCommand<ReadyMessage>(CRCLSMessage.READY)
}
