import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import {
	DatePicker,
	Accordion,
	AccordionSection,
	RadioGroup,
	Radio,
	Map,
	TimePicker,
	Button,
	TextField,
} from 'components'
import { useApi, useLocalStorage } from 'hooks'
import { BiTime } from 'react-icons/bi'
import { GrMultiple } from 'react-icons/gr'
import { FiSettings } from 'react-icons/fi'
import dayjs from 'dayjs'
import SoccerConfigs, { soccerSettings } from './ConfigurationForms/SoccerConfigs'
import { useNavigate } from 'react-router-dom'

const CreateEvent = () => {
	const { get } = useLocalStorage()
	const navigate = useNavigate()
	const { createActivity, getActivities } = useApi()
	const dispatch = useDispatch()
	const { t } = useTranslation()
	const form = useForm({
		defaultValues: {
			title: '',
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

	const [loading, setLoading] = useState<boolean>(false)

	const onSubmit = async (data) => {
		setLoading(true)
		await dispatch<any>(createActivity(data))
		await dispatch<any>(getActivities())
		setLoading(false)
		navigate('/listing')
	}

	return (
		<div className="p-8 w-[50%] m-auto h-screen">
			<form className="flex flex-col space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
				<Accordion>
					<AccordionSection title={t('Mode')} icon={<GrMultiple size={25} />} expanded={true}>
						<div className="flex flex-col gap-y-4">
							<TextField {...form.register('title')} label="Title" fullWidth />
							<RadioGroup
								defaultValue={form.getValues('mode')}
								{...form.register('mode')}
								onChange={(e) => form.setValue('mode', e.target.value)}
							>
								{get('sportPreference')?.modes.map((mode, idx) => (
									<Radio text={mode.name} description={mode.description} value={mode.value} key={idx} />
								))}
							</RadioGroup>
						</div>
					</AccordionSection>
					<AccordionSection title={t('Time & Location')} icon={<BiTime size={25} />} expanded={true}>
						<div className="flex flex-col gap-y-4">
							<div className="inline-flex gap-x-4">
								<DatePicker
									value={form.watch('date')}
									{...form.register('date')}
									onChange={(date) => form.setValue('date', date)}
								/>
								<TimePicker {...form.register('time')} />
							</div>
							<Map {...form.register('location')} />
						</div>
					</AccordionSection>
					<AccordionSection title={t('Configurations')} icon={<FiSettings size={25} />}>
						<SoccerConfigs form={form} />
					</AccordionSection>
				</Accordion>
				<Button type="submit" isLoading={loading} disabled={loading} text={t('Create')} />
			</form>
		</div>
	)
}

export default CreateEvent
