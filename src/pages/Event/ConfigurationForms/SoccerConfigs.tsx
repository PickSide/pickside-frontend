import { TextAreaField, TextField, NumberField, ChipGroup, Chip } from 'components'
import { useTranslation } from 'react-i18next'

const SoccerConfigs = () => {
	const { t } = useTranslation()
	return (
		<div className="flex flex-col">
			<ChipGroup label='Entry level' name='level'>
				<Chip text="Beginner" value="beginner" />
				<Chip text="Intermediate" value="intermediate" />
				<Chip text="Good" value="good" />
				<Chip text="Very Pro" value="vgood" />
				<Chip text="Pro" value="pro" />
			</ChipGroup>
			<NumberField label={t('Max. player')} />
			<NumberField label={t('Price per person')} />
			<TextAreaField label={t('Rules')} />
		</div>
	)
}

export const soccerSettings = {
	maxPlayer: 22,
	levelEntry: 'beginner',
	pricePp: 0,
	rules: '',
}

export default SoccerConfigs
