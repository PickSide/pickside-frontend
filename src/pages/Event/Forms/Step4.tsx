import { Controller, UseFormReturn } from 'react-hook-form'

import { ImageUploader } from 'widgets'
import { TFunction } from 'i18next'
import { TextField } from 'components'

const Divider = () => <div className="border border-gray-200 my-6"></div>

interface FormProps {
	form: UseFormReturn
	t: TFunction
}

const Step4 = ({ form, t }: FormProps) => (
	<div className="flex flex-col">
		<Controller
			control={form.control}
			name="title"
			render={({ field }) => (
				<TextField
					label={t('Title')}
					placeholder={t('Type your title')}
					onChange={(e) => form.setValue('title', e.target.value)}
					fullWidth
				/>
			)}
		/>
		<Divider />
		<Controller
			control={form.control}
			name="images"
			render={({ field }) => <ImageUploader onChange={(value) => form.setValue('images', value)} />}
		/>
	</div>
)

export default Step4
