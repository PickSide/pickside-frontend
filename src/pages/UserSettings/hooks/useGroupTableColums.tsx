import { Icon, IconButton } from '@components'

import { Group } from '@state'
import { createColumnHelper } from '@tanstack/react-table'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

const columnHelper = createColumnHelper<Group>()

const useGroupTableColums = ({ onClickDeleteGroup, onClickViewMembers }) => {
	const { t } = useTranslation()

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
			columnHelper.accessor('id', {
				header: t(''),
				cell: (info) => {
					console.group(info.getValue())
					return (
						<div key={info.cell.id} className="flex justify-end">
							<IconButton onClick={() => onClickDeleteGroup(info.getValue())}>
								<Icon className="text-error" icon="delete" variant="filled" />
							</IconButton>
						</div>
					)
				},
				footer: (info) => info.column.id,
			}),
		],
		[t, onClickDeleteGroup, onClickViewMembers],
	)
}

export default useGroupTableColums
