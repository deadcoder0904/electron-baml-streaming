import { partial_types } from '../../../../baml_client/partial_types'
import { User } from '../../../../baml_client/types'

export const formatErrorMessage = (error: unknown): string => {
	return `Error generating random user: ${(error as Error).message || String(error)}`
}

export const formatAddress = (
	address: User['address'] | partial_types.User['address'],
): string => {
	if (!address) return ''
	// Handle both regular address and streaming address with state
	const addr = 'value' in address ? address.value : address
	if (!addr) return ''

	// Type assertion to ensure addr has the correct address properties
	const typedAddr = addr as User['address'] | partial_types.User['address']

	if (!typedAddr) return ''

	return `${typedAddr.buildingNumber || ''} ${typedAddr.street || ''}, ${typedAddr.city || ''}, ${typedAddr.zipcode || ''}, ${typedAddr.country || ''}`
		.replace(/,\s*,/g, ',')
		.replace(/^,\s*|,\s*$/g, '')
}

export const mergePartialUser = (
	prevUser: partial_types.User | null,
	partialUser: partial_types.User,
): partial_types.User => {
	return {
		...prevUser,
		...partialUser,
		address: partialUser.address || prevUser?.address,
	}
}

// Helper function to extract address value from StreamState or direct address
export const getAddressValue = (address: any) => {
	if (!address) return null
	return 'value' in address ? address.value : address
}
