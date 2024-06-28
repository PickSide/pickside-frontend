import { AppState, Group } from '@state'
import { Button, Dialog, Spinner } from '@components'
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'

import AddGroupFormDialog from '../components/forms/dialogs/AddGroupFormDialog'
import DeleteGroupDialog from '../components/dialogs/DeleteGroupDialog'
import LeaveGroupDialog from '../components/dialogs/LeaveGroupDialog'
import ViewMembersDialog from '../components/dialogs/ViewMembersDialog'
import { useFetchGroups } from '@hooks'
import useGroupTableColums from '../hooks/useGroupTableColums'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

const Groups = () => {
	const { isLoading: isFetchingGroupsLoading } = useFetchGroups()
	const { t } = useTranslation()

	const groups = useSelector((state: AppState) => state.groups)

	const [openEditCreateGroupDialog, setOpenEditCreateGroupDialog] = useState<boolean>(false)
	const [openConfirmDeleteGroupDialog, setOpenConfirmDeleteGroupDialog] = useState<boolean>(false)
	const [openViewMembersDialog, setOpenViewMembersDialog] = useState<boolean>(false)
	const [openLeaveGroupDialog, setOpenLeaveGroupDialog] = useState<boolean>(false)

	const [selectedGroup, setSelectedGroup] = useState<Group>()

	const columns = useGroupTableColums({
		onClickDeleteGroup: (group: Group) => {
			setOpenConfirmDeleteGroupDialog(true)
			setSelectedGroup(group)
		},
		onClickLeaveGroup: (group: Group) => {
			setOpenLeaveGroupDialog(true)
			setSelectedGroup(group)
		},
		onClickViewMembers: (group: Group) => {
			setOpenViewMembersDialog(true)
			setSelectedGroup(group)
		},
	})

	const table = useReactTable({
		data: groups?.result || [],
		columns,
		getCoreRowModel: getCoreRowModel(),
	})

	return (
		<>
			{/* Add Group Form Dialog */}
			<Dialog
				open={openEditCreateGroupDialog}
				onClose={() => setOpenEditCreateGroupDialog(false)}
				title={t('Create new group')}
			>
				<AddGroupFormDialog onClose={() => setOpenEditCreateGroupDialog(false)} />
			</Dialog>

			{/* View Members Dialog */}
			<Dialog open={openViewMembersDialog} onClose={() => setOpenViewMembersDialog(false)} title={t('Members')}>
				<ViewMembersDialog group={selectedGroup} onClose={() => setOpenViewMembersDialog(false)} />
			</Dialog>

			{/* Delete Group Dialog */}
			<Dialog
				open={openConfirmDeleteGroupDialog}
				onClose={() => setOpenConfirmDeleteGroupDialog(false)}
				title={t('Delete group')}
			>
				<DeleteGroupDialog group={selectedGroup} onClose={() => setOpenConfirmDeleteGroupDialog(false)} />
			</Dialog>

			{/* Leave Group Dialog */}
			<Dialog open={openLeaveGroupDialog} onClose={() => setOpenLeaveGroupDialog(false)} title={t('Leave group')}>
				<LeaveGroupDialog group={selectedGroup} onClose={() => setOpenLeaveGroupDialog(false)} />
			</Dialog>

			<div className="p-5 w-full h-full overflow-y-scroll">
				<Button className="float-right mb-4" onClick={() => setOpenEditCreateGroupDialog(true)}>
					{t('Add group')}
				</Button>
				{!groups?.result?.length ? (
					<div className="flex items-center justify-center">{t('No groups')}</div>
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
										<td key={cell.id} className="p-4 border-b-2">
											{flexRender(cell.column.columnDef.cell, cell.getContext())}
										</td>
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
