import React from 'react'

interface InfoRowProps {
	label: string
	value: string | undefined
	className?: string
}

export const InfoRow: React.FC<InfoRowProps> = ({
	label,
	value,
	className = 'text-white',
}) => (
	<div className="flex justify-between items-center py-2 px-2">
		<span className="text-gray-400 font-medium min-w-[80px] text-sm">
			{label}:
		</span>
		<span className={`${className} font-medium text-right text-sm`}>
			{value || <span className="text-gray-500 italic">—</span>}
		</span>
	</div>
)
