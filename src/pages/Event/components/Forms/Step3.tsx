import { Controller } from 'react-hook-form'
import { TFunction } from 'i18next'
import { TextAreaField } from '@components'
import { useDevice } from '@hooks'

const Step3 = ({ setValue, t }) => {
	const [device] = useDevice()

	return (
		<TextAreaField
			label={t('Rules')}
			onChange={(e) => setValue('rules', e.target.value)}
			placeholder={t('Let your teammates know wht you expect of them ...')}
			fullWidth
			rows={device === 'mobile' ? '10' : '8'}
		/>
	)
}

export default Step3
