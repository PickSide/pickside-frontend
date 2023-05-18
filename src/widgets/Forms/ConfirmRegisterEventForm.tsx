import { FC } from 'react'
import { useDispatch } from 'react-redux'
import { useApi } from 'hooks'
import { useTranslation } from 'react-i18next'

interface ConfirmRegisterEventFormProps {
	id?: string
	title?: string
	isLevelLessThanRequired?: boolean
	onClose: () => void
}

const ConfirmRegisterEventForm: FC<ConfirmRegisterEventFormProps> = ({ id, onClose }) => {
	const { registerToActivity } = useApi()
	const { t } = useTranslation()
	const dispatch = useDispatch()

	const onRegisterEvent = () => {
		dispatch<any>(registerToActivity(id))
		onClose()
	}

	return (
		<div className="p-6">
			<span>{t('Are you sure you want to register to this event? You will have to wait for admin approval.')}</span>
		</div>
	)
}

export default ConfirmRegisterEventForm
