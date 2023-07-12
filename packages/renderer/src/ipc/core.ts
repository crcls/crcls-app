import { IpcRendererEvent } from "electron"

export function startListening() {
  window.CRCLS.on('converse-event', (_: IpcRendererEvent, data: string) => {
    try {
      const event = JSON.parse(data)
      console.log(event)
    } catch (error) {
      // TODO: handle this error
      console.error(error)
    }
  })
}
