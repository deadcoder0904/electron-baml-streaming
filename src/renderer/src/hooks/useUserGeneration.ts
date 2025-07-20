import log from 'electron-log/renderer'
import { useCallback, useState } from 'react'
import { partial_types } from '../../../../baml_client/partial_types'
import { User } from '../../../../baml_client/types'
import { StreamingStatus, UserGenerationState } from '../types'
import { formatErrorMessage, mergePartialUser } from '../utils/userUtils'

export const useUserGeneration = () => {
	const [state, setState] = useState<UserGenerationState>({
		user: null,
		finalUser: null,
		error: null,
		streamingStatus: 'idle',
	})

	const resetState = useCallback(() => {
		setState((prev) => ({
			...prev,
			user: null,
			finalUser: null,
			error: null,
		}))
	}, [])

	const setError = useCallback((error: string) => {
		setState((prev) => ({
			...prev,
			error,
			streamingStatus: 'error',
		}))
	}, [])

	const setFinalUser = useCallback((user: User) => {
		setState((prev) => ({
			...prev,
			finalUser: user,
			streamingStatus: 'complete',
		}))
	}, [])

	const updatePartialUser = useCallback((partialUser: partial_types.User) => {
		setState((prev) => ({
			...prev,
			user: mergePartialUser(prev.user, partialUser),
		}))
	}, [])

	const setStreamingStatus = useCallback((status: StreamingStatus) => {
		setState((prev) => ({ ...prev, streamingStatus: status }))
	}, [])

	const generateUser = useCallback(async (): Promise<void> => {
		resetState()
		setState((prev) => ({ ...prev, streamingStatus: 'loading' }))
		log.info('Starting random user generation')

		try {
			const result = await window.api.generateRandomUser()
			log.info('Random user generated successfully')
			// Convert final user to partial format for consistent display
			const partialUser: partial_types.User = {
				...result,
				// Handle the address properly for StreamState type
				address: result.address
					? { value: result.address, state: 'Complete' as any }
					: undefined,
			}
			setState((prev) => ({
				...prev,
				user: partialUser,
				finalUser: result,
				streamingStatus: 'complete',
			}))
		} catch (err: unknown) {
			const errorMessage = formatErrorMessage(err)
			log.error(errorMessage)
			setError(errorMessage)
		} finally {
			log.info('User generation process completed')
		}
	}, [resetState, setError])

	const generateUserStream = useCallback(async (): Promise<void> => {
		resetState()
		setStreamingStatus('streaming')
		log.info('Starting streaming random user generation')

		try {
			const result = await window.api.generateRandomUserStream()
			log.info('Random user generated successfully via streaming')
			setFinalUser(result)
		} catch (err: unknown) {
			const errorMessage = formatErrorMessage(err)
			log.error(errorMessage)
			setError(errorMessage)
		} finally {
			log.info('User generation process completed')
			setTimeout(() => setStreamingStatus('idle'), 100)
		}
	}, [resetState, setFinalUser, setError, setStreamingStatus])

	return {
		...state,
		generateUser,
		generateUserStream,
		updatePartialUser,
		setStreamingStatus,
	}
}
