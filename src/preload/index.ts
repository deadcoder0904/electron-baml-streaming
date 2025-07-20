import { contextBridge } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {
	generateRandomUser: () =>
		electronAPI.ipcRenderer.invoke('generate-random-user'),
	generateRandomUserStream: () => {
		const result = electronAPI.ipcRenderer.invoke('generate-random-user-stream')
		// Set up progress event listener
		electronAPI.ipcRenderer.on('user-generation-progress', (_, data) => {
			document.dispatchEvent(
				new CustomEvent('user-generation-progress', { detail: data }),
			)
		})
		return result
	},
	log: (message: string, level: string = 'info') =>
		electronAPI.ipcRenderer.send('log-message', { message, level }),
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
	try {
		contextBridge.exposeInMainWorld('electron', electronAPI)
		contextBridge.exposeInMainWorld('api', api)
	} catch (error) {
		console.error(error)
	}
} else {
	// @ts-ignore (define in dts)
	window.electron = electronAPI
	// @ts-ignore (define in dts)
	window.api = api
}
