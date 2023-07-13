import { app, BrowserWindow } from 'electron'
import { release } from 'os'
import { config } from 'dotenv'

// Initialize ENV vars
config()

import { startConverse, stopConverse } from './converse'
import { win, createWindow } from './window'

import './store/electron-store'

// Disable GPU Acceleration for Windows 7
if (release().startsWith('6.1')) app.disableHardwareAcceleration()

// Set application name for Windows 10+ notifications
if (process.platform === 'win32') app.setAppUserModelId(app.getName())

if (!app.requestSingleInstanceLock()) {
  app.quit()
  process.exit(0)
}

app.whenReady().then(() => {
  startConverse().then(createWindow)
})

app.on('window-all-closed', () => {
  win?.close()

  if (process.platform !== 'darwin') {
    stopConverse()
    app.quit()
  }
})

app.on('second-instance', () => {
  if (win) {
    // Focus on the main window if the user tried to open another
    if (win.isMinimized()) win.restore()
    win.focus()
  }
})

app.on('activate', () => {
  const allWindows = BrowserWindow.getAllWindows()
  if (allWindows.length) {
    allWindows[0].focus()
  } else {
    createWindow()
  }
})
