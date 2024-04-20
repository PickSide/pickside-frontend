import { AppState, User } from '@state'
import { Button, Dialog, DialogCTA, Spinner } from '@components'
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { useDeleteGroup, useFetchGroups, } from '@hooks'

import AddGroupFormDialog from '../components/forms/dialogs/AddGroupFormDialog'
import MembersViewDialog from '../components/dialogs/MembersViewDialog'
import useGroupTableColums from '../hooks/useGroupTableColums'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

const Groups = () => {
	const { deleteGroup, isLoading: isDeletingGroupLoading } = useDeleteGroup()
	const { isLoading: isFetchingGroupsLoading } = useFetchGroups()
	const { t } = useTranslation()

	const groups = useSelector((state: AppState) => state.groups)

	const [openEditCreateGroupDialog, setOpenEditCreateGroupDialog] = useState<boolean>(false)
	const [openConfirmDeleteGroupDialog, setOpenConfirmDeleteGroupDialog] = useState<boolean>(false)
	const [openViewMembersDialog, setOpenViewMembersDialog] = useState<boolean>(false)
	const [openInfoGroupDialog, setOpenInfoGroupDialog] = useState<boolean>(false)

	const [selectedGroupMembers, setSelectedGroupMembers] = useState<User[]>([])
	const [selectedGroupId, setSelectedGroupId] = useState<string>('')

	const columns = useGroupTableColums({
		onClickDeleteGroup: (groupId) => {
			setOpenConfirmDeleteGroupDialog(true)
			setSelectedGroupId(groupId)
		},
		onClickViewMembers: (members: User[]) => {
			setOpenViewMembersDialog(true)
			setSelectedGroupMembers(members)
		}
	})

	const table = useReactTable({
		data: groups?.results || [],
		columns,
		getCoreRowModel: getCoreRowModel(),
	})

	return (
		<>
			<Dialog
				open={openEditCreateGroupDialog}
				onClose={() => setOpenEditCreateGroupDialog(false)}
				title={t('Create new group')}
			>
				<AddGroupFormDialog onClose={() => setOpenEditCreateGroupDialog(false)} />
			</Dialog>
			<Dialog
				open={openViewMembersDialog}
				onClose={() => setOpenViewMembersDialog(false)}
				title={t('Members')}
			>
				<MembersViewDialog onClose={() => setOpenViewMembersDialog(false)} members={selectedGroupMembers} />
			</Dialog>
			<Dialog open={openConfirmDeleteGroupDialog} onClose={() => setOpenConfirmDeleteGroupDialog(false)} title={t('Delete group')}>
				<p>{t('Are you sure you want to delete group ?')}</p>
				<DialogCTA>
					<Button variant="tertiary" onClick={() => setOpenConfirmDeleteGroupDialog(false)}>
						{t('Cancel')}
					</Button>
					<Button
						variant="danger"
						isLoading={isDeletingGroupLoading}
						onClick={() => {
							deleteGroup(selectedGroupId)
							setOpenConfirmDeleteGroupDialog(false)
						}}
					>
						{t('Delete')}
					</Button>
				</DialogCTA>
			</Dialog>

			<Dialog open={openInfoGroupDialog} onClose={() => setOpenInfoGroupDialog(false)}></Dialog>

			<div className="p-5 w-full h-full overflow-y-scroll">
				<Button className="float-right mb-4" onClick={() => setOpenEditCreateGroupDialog(true)}>
					{t('Add group')}
				</Button>
				{!groups?.results?.length ? (
					<div className='flex items-center justify-center'>
						{t('No groups')}
					</div>
				) : isFetchingGroupsLoading ? (
					<Spinner text={t('Loading groups')} />
				) : (
					<table className="min-w-full text-start border-2 border-separate overflow-hidden border-spacing-0 rounded-lg">
						<thead className="border-b h-10 bg-cloud">
							{table.getHeaderGroups().map((headerGroup) => (
								<tr key={headerGroup.id}>
									{headerGroup.headers.map((header) => (
										<th key={header.id} className="text-left text-base text-charcoal-black p-4">
											{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
										</th>
									))}
								</tr>
							))}
						</thead>
						<tbody>
							{table.getRowModel().rows.map((row) => (
								<tr key={row.id} className="h-8 border-b-2">
									{row.getVisibleCells().map((cell) => (
										<td key={cell.id} className='p-4 border-b-2'>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
									))}
								</tr>
							))}
						</tbody>
					</table>
				)}
			</div>
		</>
	)
}

export default Groups
