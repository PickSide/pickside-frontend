import { FC, useContext } from 'react'
import { Icon, IconButton } from '@components'

import { SidenavDispatchContext } from '@context'
import UsersAutocomplete from './UsersAutocomplete'
import useFetchMessages from '../hooks/useFetchMessages'
import { useTranslation } from 'react-i18next'

const MessageMenu: FC<any> = ({ ...rest }) => {
	const sidenavDispatch = useContext(SidenavDispatchContext)

	const { messages, isLoading: isMessagesLoading, refetch } = useFetchMessages()
	const { t } = useTranslation()

	const MessagingInterface = () => {
		return (
			<div className="flex flex-col w-full">
				<UsersAutocomplete placeholder={t('Search members')} />
			</div>
		)
	}

	return (
		<IconButton
			className="text-grey-600"
			onClick={() => sidenavDispatch({ type: 'open', title: t('Messages'), content: <MessagingInterface /> })}
		>
			<Icon icon="chat_bubble_outline" />
		</IconButton>
	)
}

export default MessageMenu
