import React from 'react'

interface ErrorDisplayProps {
	error: string
}

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ error }) => (
	<div className="w-full max-w-4xl mb-6 px-4">
		<p className="text-red-400 text-sm font-medium bg-red-900 bg-opacity-40 px-6 py-4 rounded-lg text-center border border-red-700">
			{error}
		</p>
	</div>
)
