import { Button, DialogCTA } from '@components'

import { FC } from 'react'
import { Group } from '@state'
import { useLeaveGroup } from '@hooks'
import { useTranslation } from 'react-i18next'

interface LeaveGroupDialogProps {
	group?: Group
	onClose: () => void
}
const LeaveGroupDialog: FC<LeaveGroupDialogProps> = ({ group, onClose }) => {
	const { leaveGroup, isLoading } = useLeaveGroup()

	const { t } = useTranslation()

	return group ? (
		<>
			<p>{t('Are you sure you want to leave the group ? You would need to be invited again.')}</p>
			<DialogCTA>
				<Button variant="tertiary" onClick={onClose}>
					{t('Cancel')}
				</Button>
				<Button
					variant="danger"
					isLoading={isLoading}
					onClick={() => {
						if (group?.id) {
							leaveGroup(group.id)
							onClose()
						}
					}}
				>
					{t('Leave')}
				</Button>
			</DialogCTA>
		</>
	) : (
		<p>{t('No group selected.')}</p>
	)
}

export default LeaveGroupDialog
