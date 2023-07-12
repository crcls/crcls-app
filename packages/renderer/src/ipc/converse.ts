import { ReadyEvent } from "./types"

export function sendCommand(cmd: string, data: string): Promise<any> {
  return new Promise(() => {
    window.CRCLS.once('converse-event', response => {
      console.log(response)
    })
    window.CRCLS.sendCommand(cmd, data)
  })
}

export function waitForReady(): Promise<ReadyEvent> {
  return new Promise((resolve) => {
    window.CRCLS.once('converse-event', (_, replyData) => {
      try {
        const replyEvent = JSON.parse(replyData)
        console.log(replyEvent)
        if (replyEvent !== undefined) {
          resolve(replyEvent)
        }
      } catch (e) {
        console.error(e)
      }
    })

    // TODO: add backoff timeout incase the event never comes.
  })
}
