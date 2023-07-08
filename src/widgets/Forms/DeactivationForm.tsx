import { Button } from 'components'
import { useApi } from 'hooks'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'

const DeactivationForm = ({ onClose }) => {
	const { deactivate } = useApi()
	const dispatch = useDispatch()
	const { t } = useTranslation()

	return (
		<div className="flex flex-col">
			<p className="">
				{t(
					'Deactivating your account will prevent login for 30 unless your manually reactivate it. To reactive your account, please re-login and follow the instrutions',
				)}
			</p>
			<div className="inline-flex items-center justify-end h-16 space-x-4">
				<Button type="submit" text={t('Cancel')} onClick={onClose} />
				<Button variant="danger" text={t('Continue')} onClick={() => dispatch<any>(deactivate())} />
			</div>
		</div>
	)
}

export default DeactivationForm
