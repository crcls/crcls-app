import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('CRCLS', {
  ping: () => ipcRenderer.invoke('ping')
})