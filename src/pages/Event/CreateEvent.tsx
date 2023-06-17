import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { DatePicker, Accordion, AccordionSection, RadioGroup, Radio, Map, TimePicker, Button } from 'components'
import { useApi, useLocalStorage } from 'hooks'
import { BiTime } from 'react-icons/bi'
import { GrMultiple } from 'react-icons/gr'
import { FaLocationArrow } from 'react-icons/fa'
import { FiSettings } from 'react-icons/fi'
import dayjs from 'dayjs'
import SoccerConfigs, { soccerSettings } from './ConfigurationForms/SoccerConfigs'

const CreateEvent = () => {
	const { get } = useLocalStorage()
	const { createActivity, getActivities } = useApi()
	const dispatch = useDispatch()
	const { t } = useTranslation()
	const { watch, register, setValue, getValues, handleSubmit } = useForm({
		defaultValues: {
			mode: '8v8',
			date: dayjs(),
			location: '',
			time: '',
			...soccerSettings,
		},
		reValidateMode: 'onSubmit',
		resetOptions: {
			keepDirtyValues: false,
			keepErrors: false,
		},
	})

	const onSubmit = async (values) => {
		console.log(values)
	}

	return (
		<div className="p-8 w-[50%] m-auto h-screen">
			<form className="flex flex-col space-y-4" onSubmit={handleSubmit(onSubmit)}>
				<Accordion>
					<AccordionSection title={t('Select mode')} icon={<GrMultiple size={25} />} expanded={true}>
						<RadioGroup {...register('mode')} name="mode">
							{get('sportPreference')?.modes.map((mode, idx) => (
								<Radio text={mode.name} description={mode.description} value={mode.value} key={idx} />
							))}
						</RadioGroup>
					</AccordionSection>
					<AccordionSection title={t('Select mode')} icon={<BiTime size={25} />} expanded={true}>
						<div className="inline-flex gap-x-4">
							<DatePicker {...register('date')} value={watch('date')} onChange={(date) => setValue('date', date)} />
							<TimePicker {...register('time')} />
						</div>
					</AccordionSection>
					<AccordionSection title={t('Select mode')} icon={<FaLocationArrow size={25} />} expanded={true}>
						<Map {...register('location')} />
					</AccordionSection>
					<AccordionSection title={t('Select mode')} icon={<FiSettings size={25} />}>
						<SoccerConfigs />
					</AccordionSection>
				</Accordion>
				<Button type="submit">{t('Create')}</Button>
			</form>
		</div>
	)
}

export default CreateEvent
