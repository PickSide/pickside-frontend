import { Badge } from '@components'
import { FC } from 'react'
import { User } from '@state'
import { useTranslation } from 'react-i18next'

interface MembersViewDialogProps {
	members?: User[]
	onClose?: () => void
}

const ViewMembersDialog: FC<MembersViewDialogProps> = ({ members }) => {
	const { t } = useTranslation()

	return (
		<div className="flex flex-col gap-y-4">
			{members?.map((member, idx) => (
				<div key={idx} className="grid grid-cols-4 grid-flow-col gap-4">
					<span className="text-md">{member.displayName}</span>
					<span className="text-md col-span-2">{member.email}</span>
					<Badge
						className="col-span-2"
						variant={member.acceptedInvitation ? 'success' : 'error'}
						text={member.acceptedInvitation ? t('Accepted') : t('Not accepted')}
					/>
				</div>
			))}
		</div>
	)
}

export default ViewMembersDialog
