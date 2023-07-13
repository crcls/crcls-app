import { CRCLSMessage } from '@/types'
import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('CRCLS', {
  sendCommand: (cmd: string, subcmd?: string, data?: string) => {
    let command = `/${cmd}`
    if (subcmd !== undefined) {
      command = `${command} ${subcmd}`
    }

    if (data !== undefined) {
      command = `${command} ${data}`
    }

    ipcRenderer.send('command', command)
  },
  on: <T extends CRCLSMessageUnion>(type: CRCLSMessage, cb: CommandHandler<T>) => {
    ipcRenderer.on(type, cb)
  },
  once: <T extends CRCLSMessageUnion>(type: CRCLSMessage, cb: CommandHandler<T>) => {
    ipcRenderer.once(type, (t, response) => {
      ipcRenderer.removeListener(type, cb)
      cb(t, response)
    })
  },
  removeListener: <T extends CRCLSMessageUnion>(type: CRCLSMessage, listener: CommandHandler<T>) => {
    ipcRenderer.removeListener(type, listener)
  },
})

contextBridge.exposeInMainWorld('frame', {
  minimize: () => ipcRenderer.invoke('minimize-window'),
  maximize: () => ipcRenderer.invoke('maximize-window'),
  close: () => ipcRenderer.invoke('close-window'),
})
