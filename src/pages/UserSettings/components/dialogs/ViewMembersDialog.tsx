import { Badge, Button } from '@components'
import { FC, useCallback } from 'react'

import { Group } from '@state'
import useResendGroupInvitation from '@hooks/services/useResendGroupInvitation'
import { useTranslation } from 'react-i18next'

interface MembersViewDialogProps {
	group?: Group
	onClose?: () => void
}

const ViewMembersDialog: FC<MembersViewDialogProps> = ({ group, onClose }) => {
	const { t } = useTranslation()
	const { resendGroupInvitation, isLoading } = useResendGroupInvitation()

	const InvitationStatusCSSMap: Record<string, 'success' | 'error' | 'warning' | 'info'> = {
		accepted: 'success',
		declined: 'error',
		pending: 'warning',
	}

	const InvitationStatusTextMap: Record<string, string> = {
		accepted: t('Accepted'),
		declined: t('Declined'),
		pending: t('Pending'),
	}

	const handleOnResendInvitation = useCallback(
		(userId: string) => {
			if (group?.id) {
				resendGroupInvitation({ groupId: group.id, userId })
			}
		},
		[group?.id, resendGroupInvitation],
	)

	return (
		<div className="grid gap-y-4">
			{group?.members?.map((member, idx) => (
				<div key={idx} className="grid grid-cols-5 items-center gap-x-4">
					<span className="col-span-1">{member.displayName}</span>
					<span className="col-span-2">{member.email}</span>
					<Badge
						className="col-span-1"
						variant={member.invitationStatus ? InvitationStatusCSSMap[member.invitationStatus] : 'info'}
						text={member.invitationStatus ? InvitationStatusTextMap[member.invitationStatus] : t('No status')}
					/>
					{group.isOrganizer && member.invitationStatus !== 'accepted' && (
						<Button
							className="col-span-1"
							variant="tertiary"
							isLoading={isLoading}
							onClick={() => handleOnResendInvitation(member?.id)}
						>
							{t('Resend')}
						</Button>
					)}
				</div>
			))}
		</div>
	)
}

export default ViewMembersDialog
