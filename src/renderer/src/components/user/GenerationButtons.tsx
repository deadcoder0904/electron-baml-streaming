import React from 'react'
import { StreamingStatus } from '../../types'

interface GenerationButtonsProps {
	onGenerateUser: () => void
	onStreamUser: () => void
	streamingStatus: StreamingStatus
}

export const GenerationButtons: React.FC<GenerationButtonsProps> = ({
	onGenerateUser,
	onStreamUser,
	streamingStatus,
}) => {
	const isGenerating = streamingStatus === 'streaming'

	return (
		<div className="flex gap-4 mb-8 pb-4">
			<button
				type="button"
				onClick={onGenerateUser}
				disabled={isGenerating}
				className={`px-6 py-3 text-sm font-semibold bg-indigo-500 text-white border-none rounded-lg shadow-lg ${
					isGenerating
						? 'cursor-not-allowed opacity-60'
						: 'cursor-pointer hover:bg-indigo-600 hover:shadow-xl'
				} transition-all duration-300`}
			>
				Generate Random User
			</button>

			<button
				type="button"
				onClick={onStreamUser}
				disabled={isGenerating}
				className={`px-6 py-3 text-sm font-semibold bg-purple-500 text-white border-none rounded-lg shadow-lg ${
					isGenerating
						? 'cursor-not-allowed opacity-60'
						: 'cursor-pointer hover:bg-purple-600 hover:shadow-xl'
				} transition-all duration-300`}
			>
				Stream Random User
			</button>
		</div>
	)
}
