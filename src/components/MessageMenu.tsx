import '/node_modules/flag-icons/css/flag-icons.min.css'

import { Dropdown, Icon, IconDropdown, MenuItem } from '@components'
import { useDevice, useLocaleSwitcher } from '@hooks'

import { AppState } from '@state'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

const MessageMenu = ({ ...rest }) => {
	const [device] = useDevice()
	const { t } = useTranslation()

	return device === 'mobile' ? (
		<IconDropdown icon={<Icon icon="chat_bubble" />}>
			<></>
		</IconDropdown>
	) : (
		<Dropdown variant="secondary" text={t('Messages') /*current*/} start={<Icon icon="chat_bubble" />}>
			<></>
		</Dropdown>
	)
}

export default MessageMenu
