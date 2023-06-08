import { FC, useMemo, useEffect, useCallback } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import {
	DatePicker,
	Select,
	Accordion,
	GroupRadio,
	Map,
	Switch,
	TextField,
	TextAreaField,
	TimePicker,
} from 'components'
import { InputSetting, Settings } from 'utils'
import { useApi, useLocalStorage } from 'hooks'
import { GrMultiple } from 'react-icons/gr'
import { FaLocationArrow } from 'react-icons/fa'
import { FiSettings } from 'react-icons/fi'
import { AppState, Sport } from 'state'
import dayjs from 'dayjs'

const CreateEvent = () => {
	const { get } = useLocalStorage()
	const selected = get('sportPreference')
	const sportModes = get('sportPreference').modes
	const { createActivity, getActivities } = useApi()
	const dispatch = useDispatch()
	const { t } = useTranslation()
	const { watch, register, setValue, getValues } = useForm({
		defaultValues: { ...Settings[selected.value]['formValues'], customLocation: false, location: {}, date: dayjs() },
	})

	const playables = useSelector((state: AppState) => state.playables)

	console.log(playables)

	const Header = ({ value }) => <p className="text-[25px] text-gray-500 font-semibold">{value}</p>

	const onSubmit = async (values) => {
		await dispatch<any>(createActivity(values))
		await dispatch<any>(getActivities())
	}

	const SettingInput = useCallback(
		({ setting }) => {
			const { name, label, placeholder, type, basedOn } = setting

			if (type === 'list') {
				return <TextField />
			}
			if (type === 'time') {
				return <TimePicker />
			}
			if (type === 'switch') {
				return (
					<Switch
						label={label}
						defaultChecked={getValues(name)}
						{...register(name)}
						onChange={(e) => setValue(name, e.target.checked)}
					/>
				)
			}
			if (type === 'textarea') {
				return <TextAreaField label={label} placeholder={placeholder} />
			}
			return <TextField type={type} label={label} placeholder={placeholder} dense />
		},
		[register, getValues, setValue],
	)

	return (
		<div className="p-8 w-[50%] m-auto h-screen">
			<div className="flex flex-col space-y-4">
				<Accordion
					sections={[
						{
							title: 'Select mode',
							icon: <GrMultiple size={25} />,
							expanded: true,
							content: (
								<GroupRadio
									defaultValue={watch('mode')}
									options={sportModes}
									getOptionLabel={(option) => option?.name}
									getOptionDescription={(option) => option?.description}
									{...register('mode')}
									onChange={(mode) => setValue('mode', mode)}
								/>
							),
						},
						{
							title: 'Select location',
							icon: <FaLocationArrow size={25} />,
							expanded: true,
							content: (
								<>
									<Switch
										defaultChecked={getValues('customLocation')}
										label="Choose custom location"
										onChange={(e) => setValue('customLocation', e.target.checked)}
									/>
									{!watch('customLocation') && (
										<Select
											value={watch('location')}
											placeholder={t('Select field')}
											options={playables?.results}
											getOptionLabel={(option) => option.fieldName}
											getOptionDisabled={(option) => !option.available}
											dense
											fullWidth
											{...register('location')}
											onChange={(location) => setValue('location', location)}
										/>
									)}
									{watch('customLocation') && <Map />}
									<DatePicker value={watch('date')} {...register('date')} onChange={(date) => setValue('date', date)} />
								</>
							),
						},
						{
							title: 'Configuration',
							icon: <FiSettings size={25} />,
							content:
								selected &&
								Settings[selected.value]['inputs']?.map((setting, idx) => (
									<div key={idx}>
										<SettingInput setting={setting} />
									</div>
								)),
						},
					]}
				/>
			</div>
		</div>
	)
}

export default CreateEvent
