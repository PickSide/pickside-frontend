import { FC, useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAsync } from 'react-use'
import { Autocomplete, Button } from 'components'
import { useCalls } from 'hooks'
import { Area } from 'state'
import { setSelectedLocation } from 'state'
import { orderBy } from 'lodash'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'

const LandingPage: FC<any> = () => {
	const { lazyGetItems } = useCalls()
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const { t } = useTranslation()
	const { loading } = useAsync(async () => {
		const items = await lazyGetItems({ endpoint: 'areas' })
		if (items) {
			setOptions(orderBy<Area>(items.results, ['city', 'country', 'state'], ['asc', 'desc']))
		}
	}, [])

	const getOptionLabel = useCallback((option: Area) => `${option.district?.join(' / ')}`, [])
	const groupBy = useCallback((option: Area) => `${option.city}`, [])

	const [options, setOptions] = useState<any>([])
	const [selected, setSelected] = useState<any>(null)

	const handleClick = async () => {
		await dispatch(setSelectedLocation(selected.coords))
		await navigate('/listing')
	}

	return (
		<section
			id="home"
			className="section inset text-black bg-white flex flex-col lg:flex-row items-center justify-center gap-y-5 gap-x-4"
		>
			<div className="flex flex-col gap-y-6">
				<div className="flex flex-col gap-y-2 items-center my-3">
					<span className="text-[30px] lg:text-[45px] font-semibold">{t('The best sporting app')}</span>
					<span className="text-[15px] lg:text-[22px] text-gray-500 font-normal">
						{t('Connect across your area and find the nearest sport events of your choice')}
					</span>
				</div>
				<div className="flex mx-auto w-[80%] lg:w-[50%] items-center justify-center gap-x-6">
					<Autocomplete
						options={options}
						getOptionLabel={getOptionLabel}
						groupBy={groupBy}
						onChange={(newValue) => setSelected(newValue)}
						placeholder={t('Choose your region')}
						loading={loading}
					/>
					<Button disabled={!selected} onClick={handleClick} text={t('Go')} />
				</div>
			</div>
			<div className="bg-landing bg-no-repeat bg-cover w-[200px] h-[200px] mb-16"></div>
		</section>
	)
}

export default LandingPage
