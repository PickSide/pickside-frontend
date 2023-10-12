import '/node_modules/flag-icons/css/flag-icons.min.css'

import { Dropdown, Icon, MenuItem } from '@components'
import { useDevice, useLocaleSwitcher } from '@hooks'

import { AppState } from '@state'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

const MessageMenu = ({ ...rest }) => {
	const { t } = useTranslation()

	return (
		<Dropdown text={t('Messages')} icon={<Icon icon="chat_bubble" variant="outlined" />}>
			<></>
		</Dropdown>
	)
}

export default MessageMenu
