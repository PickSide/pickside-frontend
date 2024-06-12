import { Button, DialogCTA } from '@components'

import { FC } from 'react'
import { Group } from '@state'
import { useDeleteGroup } from '@hooks'
import { useTranslation } from 'react-i18next'

interface DeleteGroupDialogProps {
	group?: Group
	onClose: () => void
}
const DeleteGroupDialog: FC<DeleteGroupDialogProps> = ({ group, onClose }) => {
	const { deleteGroup, isLoading } = useDeleteGroup()

	const { t } = useTranslation()

	return (
		<>
			<p>{t('Are you sure you want to delete group ?')}</p>
			<DialogCTA>
				<Button variant="tertiary" onClick={onClose}>
					{t('Cancel')}
				</Button>
				<Button
					variant="danger"
					isLoading={isLoading}
					onClick={() => {
						if (group?.id) {
							deleteGroup(group.id)
							onClose()
						}
					}}
				>
					{t('Delete')}
				</Button>
			</DialogCTA>
		</>
	)
}

export default DeleteGroupDialog
