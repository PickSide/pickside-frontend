import { Controller } from 'react-hook-form'
import { TFunction } from 'i18next'
import { TextAreaField } from 'components'
import { useDevice } from 'hooks'

interface FormProps {
	form: any
	t: TFunction
}

const Step3 = ({ form, t }: FormProps) => {
	const [device] = useDevice()

	return (
		<Controller
			name="rules"
			control={form.control}
			render={({ field }) => (
				<TextAreaField
					label={t('Rules')}
					onChange={(e) => form.setValue('rules', e.target.value)}
					placeholder={t('Let your teammates know wht you expect of them ...')}
					fullWidth
					rows={device === 'mobile' ? '10' : '8'}
				/>
			)}
		/>
	)
}

export default Step3
