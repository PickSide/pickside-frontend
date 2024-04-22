import { MenuItem, QueryAutocomplete } from '@components'
import { Ref, useContext } from 'react'

import Avatar from '@components/Avatar'
import { AxiosContext } from '@context'
import { User } from '@state'
import { useTranslation } from 'react-i18next'

interface UserAutocompleteProps {
	debounceValue?: number
	onSelectAction?: (o: User) => any
}

const UsersAutocomplete = ({
	debounceValue = 500,
	onSelectAction,
}: UserAutocompleteProps & { myRef?: Ref<HTMLInputElement> }) => {
	const { axiosMSInstance } = useContext(AxiosContext)
	const { t } = useTranslation()

	return (
		<QueryAutocomplete
			apiContext={axiosMSInstance}
			clearable
			fullWidth
			endpoint="/users"
			getOptionLabel={(option: User) => option.fullName || ''}
			getOptionValue={(option: User) => option.id || ''}
			loadingText={t('Looking for users')}
			noOptionText={t('Type to search for users')}
			placeholder={t('Search members')}
			onChange={onSelectAction}
			renderInput={(option: User) => (
				<MenuItem icon={<Avatar size="sm" variant="secondary" src={option.avatar} />}>
					<div className="inline-flex items-center gap-x-2 text-base font-normal">
						{option.displayName}
						<span className="text-gray-300">({option.fullName})</span>
					</div>
				</MenuItem>
			)}
		/>
	)
}

export default UsersAutocomplete
