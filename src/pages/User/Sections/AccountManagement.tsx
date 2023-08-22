import { BottomDrawer, ChangePasswordForm, DeactivationForm } from '@widgets'
import { Button, Dialog, Select, TextField } from '@components'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'

import { AppState } from '@state'
import { FaExternalLinkAlt } from 'react-icons/fa'
import { useApi } from '@hooks'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

const AccountManagement = () => {
	const { t } = useTranslation()
	const dispatch = useDispatch()
	const { updateUser } = useApi()

	const connectedUser = useSelector((state: AppState) => state.user)
	const locales = useSelector((state: AppState) => state.locales)
	//const connectedUser = useSelector((state: AppState) => state.timezones)

	const [openPasswordChangeDialog, setOpenPasswordChangeDialog] = useState<boolean>(false)
	const [openDeactivationDialog, setOpenDeactivationDialog] = useState<boolean>(false)

	const {
		control,
		handleSubmit,
		formState: { isDirty, dirtyFields },
		register,
		setValue,
		reset,
	} = useForm({
		defaultValues: {
			email: connectedUser?.email,
			preferredLocale: connectedUser?.preferredLocale,
			timezone: connectedUser?.timezone,
		},
	})

	const onSubmit = async (values) => {
		const keys = Object.keys(dirtyFields)
		const changes = {}

		keys.forEach((key) => (changes[key] = values[key]))

		await dispatch<any>(updateUser({ ...changes }))
	}

	return (
		<div className="relative h-full ">
			<Dialog
				open={openPasswordChangeDialog}
				title={t('Change your password')}
				onClose={() => setOpenPasswordChangeDialog(false)}
			>
				<ChangePasswordForm onClose={() => setOpenPasswordChangeDialog(false)} />
			</Dialog>
			<Dialog
				open={openDeactivationDialog}
				title={t('Account deactivation')}
				onClose={() => setOpenDeactivationDialog(false)}
			>
				<DeactivationForm onClose={() => setOpenDeactivationDialog(false)} />
			</Dialog>
			<form className="flex flex-col gap-y-4 w-[600px]" onSubmit={handleSubmit(onSubmit)}>
				<p className="text-2xl font-semibold">{t('Account Management')}</p>
				<TextField label={t('Email')} fullWidth {...register('email')} />
				<Controller
					name="preferredLocale"
					control={control}
					defaultValue={connectedUser?.preferredLocale}
					render={({ field: { value } }) => (
						<Select
							label={t('Language')}
							defaultValue={value}
							placeholder={t('Select language')}
							options={locales?.results}
							getOptionLabel={(option) => option?.description}
							getOptionValue={(option) => option?.value || ''}
							onChange={(option) =>
								setValue('preferredLocale', option.id, { shouldDirty: option.value !== value?.value })
							}
						/>
					)}
				/>
				<BottomDrawer show={isDirty} onReset={reset} />
			</form>
			{!connectedUser?.isExternalAccount && (
				<div className="mt-5 space-y-4">
					<p className="text-[20px] font-semibold">{t('Change your password')}</p>
					<Button
						type="button"
						className="flex whitespace-nowrap gap-x-4 text-[13px] items-center"
						onClick={() => setOpenPasswordChangeDialog(true)}
					>
						<>
							{t('Change')} <FaExternalLinkAlt size={15} />
						</>
					</Button>
					<p className="text-[15px] fo">
						{t('When you change your password, you will be automatically signed out from your other sessions')}
					</p>
				</div>
			)}
			<div className="mt-5 space-y-4">
				<p className="text-[20px] font-semibold">{t('Deactivate your account')}</p>
				<Button
					type="button"
					variant="danger"
					className="flex whitespace-nowrap gap-x-4 text-[13px] items-center"
					onClick={() => setOpenDeactivationDialog(true)}
				>
					<>
						{t('Deactivate')} <FaExternalLinkAlt size={15} />
					</>
				</Button>
				<p className="text-[15px] fo">
					{t('When you deactivate your account, you will have 30 days to recover it. After that, it will be deleted.')}
				</p>
			</div>
		</div>
	)
}

export default AccountManagement
