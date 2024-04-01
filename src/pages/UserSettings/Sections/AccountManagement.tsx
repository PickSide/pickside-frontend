import { BottomDrawer, Button, Dialog, InputField, Select } from '@components'
import { Controller, useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'

import { ACCOUNT_TYPE } from '@state/me/constants'
import { AppState } from '@state'
import ChangePasswordForm from '../components/forms/ChangePasswordForm'
import DeactivationForm from '../components/forms/DeactivationForm'
import { FaExternalLinkAlt } from 'react-icons/fa'
import LanguageSelector from '@components/platform/LanguageSelector'
import getDirtyFieldsValues from '../utils/getDirtyFieldsValues'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { useUpdateSetting } from '@hooks'

const AccountManagement = () => {
	const { t } = useTranslation()
	const { updateUser } = useUpdateSetting()

	const me = useSelector((state: AppState) => state.user)

	const { control, formState, reset, handleSubmit } = useForm({
		defaultValues: {
			email: me?.email,
			preferredLocale: me?.preferredLocale,
		},
		resetOptions: {
			keepDirtyValues: true,
		}
	})

	const [openPasswordChangeDialog, setOpenPasswordChangeDialog] = useState<boolean>(false)
	const [openDeactivationDialog, setOpenDeactivationDialog] = useState<boolean>(false)

	const onSubmit = async (values) => {
		const changes = getDirtyFieldsValues(values, formState)

		if (changes['preferredLocale']) {
			changes['preferredLocale'] = changes['preferredLocale'].value
		}

		await updateUser(changes)
	}

	useEffect(() => {
		reset({
			email: me?.email,
			preferredLocale: me?.preferredLocale,
		});
	}, [me, reset]);

	return (
		<div className="relative h-full">
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
				<form onSubmit={handleSubmit(onSubmit)}>
					<Controller
						name="email"
						control={control}
						render={({ field }) => <InputField {...field} label={t('Email')} fullWidth />}
					/>
					<Controller
						name="preferredLocale"
						control={control}
						render={({ field }) => (
							<LanguageSelector {...field} />
						)}
					/>
					<BottomDrawer formState={formState} onReset={reset} />
				</form>
			</div>
			{me?.accountType !== ACCOUNT_TYPE.DEFAULT && (
				<div className="mt-5 space-y-4">
					<p className="text-lg font-semibold">{t('Change your password')}</p>
					<Button
						type="button"
						className="flex whitespace-nowrap gap-x-4 text-sm items-center"
						onClick={() => setOpenPasswordChangeDialog(true)}
					>
						<>
							{t('Change')} <FaExternalLinkAlt size={15} />
						</>
					</Button>
					<p className="text-base">
						{t('When you change your password, you will be automatically signed out from your other sessions')}
					</p>
				</div>
			)}
			<div className="mt-5 space-y-4">
				<p className="text-lg font-semibold">{t('Deactivate your account')}</p>
				<Button
					variant="danger"
					className="flex whitespace-nowrap gap-x-4 items-center"
					onClick={() => setOpenDeactivationDialog(true)}
				>
					<>
						{t('Deactivate')} <FaExternalLinkAlt size={15} />
					</>
				</Button>
				<p>
					{t('When you deactivate your account, you will have 30 days to recover it. After that, it will be deleted.')}
				</p>
			</div>
		</div>
	)
}

export default AccountManagement
