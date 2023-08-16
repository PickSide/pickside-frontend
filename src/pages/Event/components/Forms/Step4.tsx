import { FormDivider, TextField } from 'components'

import { ImageUploader } from 'widgets'

const Step4 = ({ setValue, t }) => (
	<div className="flex flex-col">
		<TextField
			label={t('Title')}
			placeholder={t('Type your title')}
			onChange={(e) => setValue('title', e.target.value)}
			fullWidth
		/>
		<FormDivider />
		<ImageUploader onChange={(value) => setValue('images', value)} />
	</div>
)

export default Step4
