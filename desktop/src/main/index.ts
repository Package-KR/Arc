import { app, shell, BrowserWindow } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'

function openExternalUrl(url: string): void {
  let parsedUrl: URL

  try {
    parsedUrl = new URL(url)
  } catch {
    return
  }

  if (parsedUrl.protocol === 'https:') {
    void shell.openExternal(parsedUrl.toString())
  }
}

function createWindow(): void {
  const appLocale = app.getSystemLocale()

  const mainWindow = new BrowserWindow({
    width: 400,
    height: 640,
    minWidth: 400,
    minHeight: 640,
    title: '',
    backgroundColor: '#ffffff',
    autoHideMenuBar: true,
    show: false,
    resizable: true,
    transparent: false,
    ...(process.platform === 'darwin'
      ? { titleBarStyle: 'hiddenInset' as const, trafficLightPosition: { x: 18, y: 16 } }
      : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      additionalArguments: [`--arc-locale=${encodeURIComponent(appLocale)}`],
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true
    }
  })

  const showWindowButtons = (): void => {
    if (process.platform === 'darwin') {
      mainWindow.setWindowButtonVisibility(true)
    }
  }

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
    showWindowButtons()
  })

  mainWindow.on('focus', showWindowButtons)
  mainWindow.on('blur', showWindowButtons)

  mainWindow.on('page-title-updated', (event) => {
    event.preventDefault()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    openExternalUrl(details.url)

    return { action: 'deny' }
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.arc.desktop')

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
