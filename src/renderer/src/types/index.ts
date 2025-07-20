import { partial_types } from '../../../../baml_client/partial_types'
import { User } from '../../../../baml_client/types'

export type StreamingStatus =
	| 'idle'
	| 'loading'
	| 'streaming'
	| 'complete'
	| 'error'

export interface UserGenerationState {
	user: partial_types.User | null
	finalUser: User | null
	error: string | null
	streamingStatus: StreamingStatus
}
