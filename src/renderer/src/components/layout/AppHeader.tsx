import React from 'react'

export const AppHeader: React.FC = () => (
	<header className="px-6 py-4 border-b border-gray-700 shadow-sm flex-shrink-0">
		<h1 className="text-indigo-400 text-2xl font-extrabold tracking-wide text-center mb-2">
			Electron BAML Streaming
		</h1>
		<p className="text-gray-400 text-sm mt-1 text-center">
			Generate random users with BAML and LLMs
		</p>
	</header>
)
