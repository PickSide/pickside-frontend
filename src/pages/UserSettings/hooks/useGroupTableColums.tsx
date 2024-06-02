import { AppState, Group } from '@state'
import { Icon, IconButton } from '@components'

import { createColumnHelper } from '@tanstack/react-table'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

const columnHelper = createColumnHelper<Group>()

const useGroupTableColums = ({ onClickDeleteGroup, onClickLeaveGroup, onClickViewMembers }) => {
	const { t } = useTranslation()

	const me = useSelector((state: AppState) => state.user)

	return useMemo(
		() => [
			columnHelper.accessor('name', {
				header: t('Group Name'),
				cell: (info) => <span key={info.cell.id}>{info.getValue()}</span>,
				footer: (info) => info.column.id,
			}),
			columnHelper.accessor('organizer', {
				header: t('Organizer'),
				cell: (info) => {
					return <div key={info.cell.id} className="underline text-blue-600 cursor-pointer">
						{info.getValue()?.displayName || info.getValue()?.fullName}
					</div>
				},
				footer: (info) => info.column.id,
			}),
			columnHelper.accessor('members', {
				header: t('Members'),
				cell: (info) => (
					<div key={info.cell.id} className="flex">
						{info.getValue()?.length ?
							<span
								className="link"
								onClick={() => onClickViewMembers(info.getValue())}
							>
								{t('View members')}
							</span>
							:
							<span>{t('No members')}</span>
						}
					</div>
				),
				footer: (info) => info.column.id,
			}),
			columnHelper.accessor(row => ({
				id: row.id,
				organizerId: row.organizer ? row.organizer.id : null
			}), {
				id: 'actions',
				header: t(''),
				cell: (info) => {
					const { id: groupId, organizerId } = info.getValue()
					return (
						<div key={info.cell.id} className="flex justify-end">
							{me?.id === organizerId ? (
								<IconButton onClick={() => onClickDeleteGroup(groupId)}>
									<Icon className="text-error" icon="delete" variant="filled" />
								</IconButton>) : (
								<IconButton onClick={() => onClickLeaveGroup(groupId)}>
									<Icon className="text-info" icon="exit_to_app" variant="filled" />
								</IconButton>
							)}
						</div>
					)
				},
				footer: (info) => info.column.id,
			}),
		],
		[me, onClickDeleteGroup, onClickLeaveGroup, onClickViewMembers, t],
	)
}

export default useGroupTableColums
