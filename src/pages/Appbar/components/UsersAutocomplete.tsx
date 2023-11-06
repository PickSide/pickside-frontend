import { MenuItem, QueryAutocomplete } from '@components'
import { Ref, useContext } from 'react'

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
	const { axiosInstance } = useContext(AxiosContext)
	const { t } = useTranslation()

	return (
		<QueryAutocomplete
			apiContext={axiosInstance}
			clearable
			endpoint="/users"
			getOptionLabel={(option: User) => option.fullName || ''}
			getOptionValue={(option: User) => option.id || ''}
			loadingText={t('Looking for users')}
			noOptionText={t('Type to search for users')}
			placeholder={t('Search members')}
			onChange={onSelectAction}
			renderInput={(option: User) => (
				<MenuItem
					icon={
						<div className="flex items-center justify-center w-6 h-6 overflow-hidden border-primary border-2 rounded-full text-white bg-primary">
							{option.avatar ? (
								<img alt="" src={option.avatar} />
							) : (
								<svg width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
									<path
										fillRule="evenodd"
										clipRule="evenodd"
										d="M4.49579 23.3299C4.45167 23.7418 4.08202 24.0399 3.67016 23.9957C3.25831 23.9516 2.9602 23.582 3.00433 23.1701C3.50157 18.5292 7.32488 15 12.0001 15C16.6752 15 20.4986 18.5292 20.9958 23.1701C21.0399 23.582 20.7418 23.9516 20.33 23.9957C19.9181 24.0399 19.5485 23.7418 19.5043 23.3299C19.0878 19.4427 15.8999 16.5 12.0001 16.5C8.10025 16.5 4.91228 19.4427 4.49579 23.3299ZM12.0001 13.5C8.68635 13.5 6.00006 10.8137 6.00006 7.5C6.00006 4.18629 8.68635 1.5 12.0001 1.5C15.3138 1.5 18.0001 4.18629 18.0001 7.5C18.0001 10.8137 15.3138 13.5 12.0001 13.5ZM12.0001 12C14.4853 12 16.5001 9.98528 16.5001 7.5C16.5001 5.01472 14.4853 3 12.0001 3C9.51478 3 7.50006 5.01472 7.50006 7.5C7.50006 9.98528 9.51478 12 12.0001 12Z"
										fill="white"
									/>
								</svg>
							)}
						</div>
					}
				>
					<div className="inline-flex items-center text-base font-normal gap-x-2">
						{option.username}
						<span className="text-gray-300">({option.fullName})</span>
					</div>
				</MenuItem>
			)}
		/>
	)
}

export default UsersAutocomplete
