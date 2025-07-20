import { useEffect } from 'react'
import { partial_types } from '../../../../baml_client/partial_types'
import { StreamingStatus } from '../types'

export const useStreamingProgress = (
	onProgress: (partialUser: partial_types.User) => void,
	onStatusChange: (status: StreamingStatus) => void,
) => {
	useEffect(() => {
		const handleProgress = (event: Event): void => {
			const customEvent = event as CustomEvent
			if (customEvent.detail?.status === 'streaming') {
				onStatusChange('streaming')
				if (customEvent.detail?.data) {
					onProgress(customEvent.detail.data as partial_types.User)
				}
			}
		}

		document.addEventListener('user-generation-progress', handleProgress)
		return () =>
			document.removeEventListener('user-generation-progress', handleProgress)
	}, [onProgress, onStatusChange])
}
