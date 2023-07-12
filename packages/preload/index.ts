import { IpcRendererEvent, contextBridge, ipcRenderer } from 'electron'

type CRCLSEvent = 'converse-event'

contextBridge.exposeInMainWorld('CRCLS', {
  sendCommand: (cmd: string, data: string) => ipcRenderer.send(`/${cmd} ${data}`),
  on: (event: CRCLSEvent, cb: (e: IpcRendererEvent, ...args: any[]) => void) => {
    ipcRenderer.on(event, cb)
  },
  once: (event: CRCLSEvent, cb: (e: IpcRendererEvent, ...args: any[]) => void) => {
    ipcRenderer.on(event, (e, ...args: any[]) => {
      cb(e, ...args)
      ipcRenderer.removeListener(event, cb)
    })
  },
  removeListener: (event: string, listener: (event: IpcRendererEvent, ...args: any[]) => void) => {
    ipcRenderer.removeListener(event, listener)
  },
})

contextBridge.exposeInMainWorld('frame', {
  minimize: () => ipcRenderer.invoke('minimize-window'),
  maximize: () => ipcRenderer.invoke('maximize-window'),
  close: () => ipcRenderer.invoke('close-window'),
})
