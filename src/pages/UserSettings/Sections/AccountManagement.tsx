import { Button, Dialog, InputField, Select } from '@components'
import { Controller, useFormContext } from 'react-hook-form'

import { AppState } from '@state'
import ChangePasswordForm from '../components/ChangePasswordForm'
import DeactivationForm from '../components/DeactivationForm'
import { FaExternalLinkAlt } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

const AccountManagement = () => {
	const { t } = useTranslation()
	const { control } = useFormContext()

	const connectedUser = useSelector((state: AppState) => state.user)
	const locales = useSelector((state: AppState) => state.locales)

	const [openPasswordChangeDialog, setOpenPasswordChangeDialog] = useState<boolean>(false)
	const [openDeactivationDialog, setOpenDeactivationDialog] = useState<boolean>(false)

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
			<div className="flex flex-col gap-y-4 w-[600px]">
				<p className="text-2xl font-semibold">{t('Account Management')}</p>
				<Controller
					name="email"
					control={control}
					render={({ field }) => <InputField {...field} label={t('Email')} fullWidth />}
				/>
				<Controller
					name="preferredLocale"
					control={control}
					render={({ field }) => (
						<Select
							{...field}
							label={t('Language')}
							defaultValue={field.value}
							placeholder={t('Select language')}
							options={locales?.results}
							getOptionLabel={(option) => option.description}
							getOptionValue={(option) => option.id}
						/>
					)}
				/>
			</div>
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