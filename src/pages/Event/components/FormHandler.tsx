import { Button } from '@components'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'

interface FormHandlerProps {
	skippable?: boolean
	previousDisabled?: boolean
	nextDisabled?: boolean
	goPrevious?: Function
	goNext?: Function
	goSkip?: Function
	handleSubmit?: Function
}

const FormHandler: FC<FormHandlerProps> = ({
	skippable = false,
	previousDisabled = false,
	nextDisabled = false,
	goPrevious,
	goNext,
	goSkip,
	handleSubmit,
}) => {
	const { t } = useTranslation()
	return (
		<div className="flex justify-between py-6">
			<Button variant="secondary" disabled={previousDisabled} onClick={goPrevious}>
				{t('Previous')}
			</Button>
			<div className="flex gap-x-4">
				{skippable && (
					<Button variant="tertiary" onClick={goSkip}>
						{t('Skip')}
					</Button>
				)}
				<Button disabled={nextDisabled} onClick={handleSubmit ? handleSubmit : goNext}>
					{handleSubmit ? t('Submit') : t('Continue')}
				</Button>
			</div>
		</div>
	)
}
export default FormHandler
