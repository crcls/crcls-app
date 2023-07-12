import { IpcRendererEvent } from 'electron'

type CRCLSEvent = 'converse-event'

declare global {
  interface Window {
    CRCLS: {
      sendCommand: (cmd: string, data: string) => void
      on: (event: CRCLSEvent, cb: (event: IpcRendererEvent, data: string) => void) => void
      once: (event: CRCLSEvent, cb: (event: IpcRendererEvent, data: string) => void) => void
      removeListener: (event: CRCLSEvent, cb: (event: IpcRendererEvent, data: string) => void) => void
    }
    frame: {
      minimize: () => void
      maximize: () => void
      close: () => void
    }
  }
}
