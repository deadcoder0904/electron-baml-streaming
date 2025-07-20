import React from 'react'
import { AppFooter, AppHeader } from './components/layout'
import { ErrorDisplay, GenerationButtons, UserProfile } from './components/user'
import { useStreamingProgress, useUserGeneration } from './hooks'

function App(): React.JSX.Element {
	const userGeneration = useUserGeneration()

	useStreamingProgress(
		userGeneration.updatePartialUser,
		userGeneration.setStreamingStatus,
	)

	const { user, error, streamingStatus } = userGeneration
	const isLoading = streamingStatus === 'loading'
	const isStreaming = streamingStatus === 'streaming'

	return (
		<div className="flex flex-col h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900 text-gray-100 font-sans antialiased">
			<AppHeader />

			<main className="flex-1 flex flex-col items-center px-6 py-6 overflow-y-auto min-h-0">
				<GenerationButtons
					onGenerateUser={userGeneration.generateUser}
					onStreamUser={userGeneration.generateUserStream}
					streamingStatus={streamingStatus}
				/>

				{error && <ErrorDisplay error={error} />}

				<UserProfile user={user} isLoading={isLoading} isStreaming={isStreaming} />
			</main>

			<AppFooter />
		</div>
	)
}

export default App
