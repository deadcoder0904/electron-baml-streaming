import { ElectronAPI } from '@electron-toolkit/preload'

// Import User type from BAML client
import { User } from '../../baml_client/types'
import { partial_types } from '../../baml_client/partial_types'

// Define the streaming progress event
interface UserGenerationProgressEvent {
	status: 'streaming'
	data: partial_types.User
}

declare global {
	interface Window {
		electron: ElectronAPI
		api: {
			generateRandomUser: () => Promise<User>
			generateRandomUserStream: () => Promise<User>
			log: (message: string, level?: string) => void
		}
	}

	interface DocumentEventMap {
		'user-generation-progress': CustomEvent<UserGenerationProgressEvent>
	}
}
