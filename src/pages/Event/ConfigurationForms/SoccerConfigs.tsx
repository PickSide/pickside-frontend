import { TextAreaField, NumberField, ChipGroup, Chip, Checkbox, Switch } from 'components'
import { useTranslation } from 'react-i18next'

const SoccerConfigs = ({ form }) => {
	const { t } = useTranslation()
	return (
		<div className="flex flex-col flex-wrap gap-y-2">
			<ChipGroup
				label="Entry level"
				defaultValue={soccerSettings.level}
				{...form.register('level')}
				onChange={(e) => form.setValue('level', e.target.value)}
			>
				<Chip text="Beginner" value="beginner" />
				<Chip text="Intermediate" value="intermediate" />
				<Chip text="Good" value="good" />
				<Chip text="Very Good" value="vgood" />
				<Chip text="Pro" value="pro" />
			</ChipGroup>
			<Switch label={t('Free')} {...form.register('isFree')} />
			<NumberField label={t('Price per person')} disabled={form.watch('isFree')} {...form.register('price')} />
			<NumberField label={t('Max. player')} {...form.register('players')} />
			<TextAreaField label={t('Rules')} {...form.register('rules')} />
		</div>
	)
}

export const soccerSettings = {
	players: 22,
	level: 'beginner',
	price: 5,
	rules: '',
}

export default SoccerConfigs
