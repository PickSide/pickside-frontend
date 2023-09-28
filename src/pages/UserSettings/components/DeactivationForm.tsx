import { Button } from '@components'
import { useDeactivateAccount } from '@hooks'
import { useTranslation } from 'react-i18next'

const DeactivationForm = ({ onClose }) => {
	const { deactivateUser } = useDeactivateAccount()
	const { t } = useTranslation()

	return (
		<div className="flex flex-col">
			<p className="">
				{t(
					'Deactivating your account will prevent login for 30 unless your manually reactivate it. To reactive your account, please re-login and follow the instrutions',
				)}
			</p>
			<div className="inline-flex items-center justify-end h-16 space-x-4">
				<Button type="button" onClick={onClose}>
					{t('Cancel')}
				</Button>
				<Button
					type="button"
					variant="danger"
					onClick={() => {
						deactivateUser()
						onClose()
					}}
				>
					{t('Continue')}
				</Button>
			</div>
		</div>
	)
}

export default DeactivationForm
