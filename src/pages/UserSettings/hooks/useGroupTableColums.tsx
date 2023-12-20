import { Icon, IconButton } from '@components'
import { Link, NavLink } from 'react-router-dom'

import Avatar from '@components/Avatar'
import { Group } from '@state'
import { createColumnHelper } from '@tanstack/react-table'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

const columnHelper = createColumnHelper<Group>()

const useGroupTableColums = ({ onClickViewGroupInfo, onClickEditGroup, onClickDeleteGroup }) => {
	const { t } = useTranslation()

	return useMemo(
		() => [
			columnHelper.accessor('name', {
				header: t('Group Name'),
				cell: (info) => <span>{info.getValue()}</span>,
				footer: (info) => info.column.id,
			}),
			columnHelper.accessor('organizer', {
				header: t('Owner'),
				cell: (info) => (
					<div className="underline text-blue-600 cursor-pointer">
						{info.getValue()?.username || info.getValue()?.fullName}
					</div>
				),
				footer: (info) => info.column.id,
			}),
			columnHelper.accessor('members', {
				header: t('Members'),
				cell: (info) => (
					<div className="flex">
						{info.getValue()?.map((member) => {
							const name = member.fullName?.split(' ')
							return (
								<Link
									to={`/user-detail/${member.id}`}
									state={{ user: member }}
									className="w-6 h-6 rounded-full overflow-clip bg-primary shadow-inner text-white text-sm flex items-center justify-center"
								>
									{member.avatar ? (
										<Avatar size="sm" variant="secondary" src={member?.avatar} />
									) : name ? (
										[name[0].charAt(0).toLocaleUpperCase(), name[1].charAt(1).toLocaleUpperCase()]
									) : null}
								</Link>
							)
						})}
					</div>
				),
				footer: (info) => info.column.id,
			}),
			columnHelper.accessor('id', {
				header: t(''),
				cell: (info) => {
					return (
						<div className="flex justify-end">
							{/* <IconButton onClick={() => onClickViewGroupInfo(info.getValue())}>
								<Icon icon="info" />
							</IconButton> */}
							{/* <IconButton onClick={() => onClickEditGroup(info.getValue())}>
								<Icon icon="edit" />
							</IconButton> */}
							<IconButton onClick={() => onClickDeleteGroup(info.getValue())}>
								<Icon className="text-red-700" icon="delete" variant="filled" />
							</IconButton>
						</div>
					)
				},
				footer: (info) => info.column.id,
			}),
		],
		[t],
	)
}

export default useGroupTableColums
