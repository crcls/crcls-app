import { app, BrowserWindow, ipcMain, shell } from 'electron'
import { join } from 'path'
import contextMenu from 'electron-context-menu'

contextMenu({
  showLookUpSelection: false,
  showCopyImage: false,
  showSearchWithGoogle: false,
  showInspectElement: process.env.NODE_ENV === 'development'
})

const WIN_WIDTH = 1600
const WIN_HEIGHT = 1200

export let win: BrowserWindow | null = null

export async function createWindow() {
  win = new BrowserWindow({
    title: 'Main window',
    webPreferences: {
      preload: join(__dirname, '../preload/index.cjs'),
    },
    width: WIN_WIDTH,
    height: WIN_HEIGHT,
    frame: false,
  })

  if (app.isPackaged) {
    win.loadFile(join(__dirname, '../renderer/index.html'))
  } else {
    // 🚧 Use ['ENV_NAME'] avoid vite:define plugin
    const url = `http://[${process.env['VITE_DEV_SERVER_HOST']}]:${process.env['VITE_DEV_SERVER_PORT']}`

    win.loadURL(url)
    win.webContents.openDevTools()
  }

  // Test active push message to Renderer-process
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', new Date().toLocaleString())
  })

  // Make all links open with the browser, not with the application
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('https:')) shell.openExternal(url)
    return { action: 'deny' }
  })
}

ipcMain.handle('minimize-window', () => {
  const win = BrowserWindow.getFocusedWindow()
  win?.minimize()
})

ipcMain.handle('maximize-window', () => {
  const win = BrowserWindow.getFocusedWindow()
  if (win?.isMaximized()) {
    win.unmaximize()
  } else {
    win?.maximize()
  }
})

ipcMain.handle('close-window', () => {
  const win = BrowserWindow.getFocusedWindow()
  win?.close()
})
