import { electronApp, is, optimizer } from '@electron-toolkit/utils'
import dotenv from 'dotenv'
import { app, BrowserWindow, ipcMain, shell } from 'electron'
import log from 'electron-log'
import { join } from 'path'
import { b } from '../../baml_client/async_client.js'
import icon from '../../resources/icon.png?asset'

// Initialize the logger for renderer processes
log.initialize()

// Load environment variables from .env file
dotenv.config()

// Constants
const WINDOW_CONFIG = {
	width: 1100,
	height: 800,
	show: false,
	autoHideMenuBar: true,
} as const

// Utility functions
const getWindowIcon = () => (process.platform === 'linux' ? { icon } : {})

const getRendererPath = (): string => {
	if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
		return process.env['ELECTRON_RENDERER_URL']
	}
	return join(__dirname, '../renderer/index.html')
}

const logError = (context: string, error: unknown): void => {
	const errorMessage = `${context}: ${error}`
	log.error(errorMessage)
	console.error(errorMessage)
}

// Window management
function createMainWindow(): BrowserWindow {
	const mainWindow = new BrowserWindow({
		...WINDOW_CONFIG,
		...getWindowIcon(),
		webPreferences: {
			preload: join(__dirname, '../preload/index.js'),
			sandbox: false,
		},
	})

	setupWindowEventHandlers(mainWindow)
	loadRenderer(mainWindow)

	return mainWindow
}

function setupWindowEventHandlers(window: BrowserWindow): void {
	window.on('ready-to-show', () => {
		window.show()
	})

	window.webContents.setWindowOpenHandler((details) => {
		shell.openExternal(details.url)
		return { action: 'deny' }
	})
}

function loadRenderer(window: BrowserWindow): void {
	const rendererPath = getRendererPath()

	if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
		window.loadURL(rendererPath)
	} else {
		window.loadFile(rendererPath)
	}
}

// IPC Handlers
async function handleGenerateRandomUser(): Promise<any> {
	try {
		log.info('Generating random user with BAML')
		const user = await b.GenerateRandomUser()
		log.info('Random user generated successfully')
		return user
	} catch (error) {
		logError('Error generating random user', error)
		throw error
	}
}

async function handleGenerateRandomUserStream(
	event: Electron.IpcMainInvokeEvent,
): Promise<any> {
	try {
		log.info('Starting streaming random user generation')

		const stream = b.stream.GenerateRandomUser()

		// Process stream chunks and send progress updates
		for await (const partialUser of stream) {
			event.sender.send('user-generation-progress', {
				status: 'streaming',
				data: partialUser,
			})
		}

		const finalUser = await stream.getFinalResponse()
		log.info('Random user generated successfully via streaming')

		return finalUser
	} catch (error) {
		logError('Error in streaming random user generation', error)
		throw error
	}
}

function registerIpcHandlers(): void {
	ipcMain.handle('generate-random-user', handleGenerateRandomUser)
	ipcMain.handle('generate-random-user-stream', handleGenerateRandomUserStream)
}

// App initialization and event handlers
function setupAppEventHandlers(): void {
	app.on('browser-window-created', (_, window) => {
		optimizer.watchWindowShortcuts(window)
	})

	app.on('activate', () => {
		// On macOS, re-create window when dock icon is clicked and no windows are open
		if (BrowserWindow.getAllWindows().length === 0) {
			createMainWindow()
		}
	})

	app.on('window-all-closed', () => {
		// Quit when all windows are closed, except on macOS
		if (process.platform !== 'darwin') {
			app.quit()
		}
	})
}

async function initializeApp(): Promise<void> {
	await app.whenReady()

	// Set app user model id for windows
	electronApp.setAppUserModelId('com.electron')

	// Setup event handlers
	setupAppEventHandlers()

	// Register IPC handlers
	registerIpcHandlers()

	// Create main window
	createMainWindow()
}

// Initialize the application
initializeApp().catch((error) => {
	logError('Failed to initialize application', error)
	app.quit()
})

// Export for testing purposes
export {
	handleGenerateRandomUser,
	handleGenerateRandomUserStream,
	createMainWindow,
}
