import { Controller, UseFormReturn } from 'react-hook-form'

import { TFunction } from 'i18next'
import { TextAreaField } from 'components'

interface FormProps {
	form: UseFormReturn
	t: TFunction
}

const Step3 = ({ form, t }: FormProps) => (
	<Controller
		name="rules"
		control={form.control}
		render={({ field }) => (
			<TextAreaField
				label={t('Rules')}
				onChange={(e) => form.setValue('rules', e.target.value)}
				placeholder={t('Let your teammates know wht you expect of them ...')}
				fullWidth
			/>
		)}
	/>
)

export default Step3
