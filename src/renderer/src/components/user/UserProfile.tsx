import React from 'react'
import { partial_types } from '../../../../../baml_client/partial_types'
import { formatAddress, getAddressValue } from '../../utils/userUtils'
import { InfoRow } from './InfoRow'

interface UserProfileProps {
	user: partial_types.User | null
	isLoading?: boolean
	isStreaming?: boolean
}

export const UserProfile: React.FC<UserProfileProps> = ({
	user,
	isLoading = false,
	isStreaming = false,
}) => {
	// Get address value for display
	const addressValue = user ? getAddressValue(user.address) : null

	// Check if address is still streaming (incomplete)
	const isAddressStreaming =
		user?.address && 'state' in user.address && user.address.state !== 'Complete'

	return (
		<div className="w-full max-w-5xl bg-gray-800 bg-opacity-90 p-6 rounded-2xl text-gray-200 border border-gray-600 shadow-2xl mx-4">
			<div className="flex items-center justify-between mb-6 pb-4">
				<h3 className="text-indigo-400 text-2xl font-bold">
					User Profile{' '}
					{isLoading && (
						<span className="text-sm text-yellow-400 animate-pulse">
							(Loading...)
						</span>
					)}
					{isStreaming && (
						<span className="text-sm text-yellow-400 animate-pulse">
							(Streaming...)
						</span>
					)}
				</h3>
				{user?.id && (
					<span className="bg-indigo-600 text-white text-xs px-4 py-2 rounded-full font-medium">
						ID: {user.id}
					</span>
				)}
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				<div className="bg-gray-700 bg-opacity-50 p-6 rounded-xl">
					<h4 className="text-indigo-300 text-lg font-semibold mb-4 border-b border-indigo-500 pb-2">
						Personal Information
					</h4>
					<div className="space-y-3">
						<InfoRow
							label="Name"
							value={
								user?.firstname && user?.lastname
									? `${user.firstname} ${user.lastname}`
									: user?.firstname || user?.lastname || ''
							}
						/>
						<InfoRow
							label="Gender"
							value={user?.gender || ''}
							className="text-white capitalize"
						/>
						<InfoRow label="Birthday" value={user?.birthday || ''} />
						<InfoRow
							label="Email"
							value={user?.email || ''}
							className="text-blue-300 break-all"
						/>
						<InfoRow
							label="Phone"
							value={user?.phone || ''}
							className="text-green-300"
						/>
					</div>
				</div>

				<div className="bg-gray-700 bg-opacity-50 p-6 rounded-xl">
					<h4 className="text-indigo-300 text-lg font-semibold mb-4 border-b border-indigo-500 pb-2">
						Address Information
						{isAddressStreaming && (
							<span className="text-xs text-yellow-400 ml-2 animate-pulse">
								(Streaming...)
							</span>
						)}
					</h4>
					<div className="space-y-3">
						<InfoRow
							label="Street"
							value={
								addressValue
									? `${addressValue.buildingNumber || ''} ${addressValue.street || ''}`.trim() ||
										''
									: ''
							}
						/>
						<InfoRow label="City" value={addressValue?.city || ''} />
						<InfoRow label="Zipcode" value={addressValue?.zipcode || ''} />
						<InfoRow
							label="Country"
							value={
								addressValue
									? `${addressValue.country || ''} ${addressValue.country_code ? `(${addressValue.country_code})` : ''}`.trim()
									: ''
							}
						/>
						<InfoRow
							label="Location"
							value={
								addressValue?.latitude && addressValue?.longitude
									? `${addressValue.latitude}, ${addressValue.longitude}`
									: ''
							}
							className="text-yellow-300"
						/>
					</div>
				</div>
			</div>

			<div className="mt-8 pt-4">
				<div className="bg-gray-700 bg-opacity-30 p-4 rounded-lg">
					<p className="text-gray-300 text-sm font-medium">
						<span className="text-indigo-400 text-sm">Complete Address:</span>{' '}
						{user?.address ? (
							formatAddress(user.address)
						) : (
							<span className="text-gray-500 italic">—</span>
						)}
					</p>
				</div>
			</div>
		</div>
	)
}
