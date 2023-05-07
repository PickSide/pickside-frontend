import { FC, useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAsync } from 'react-use'
import { Autocomplete, TextField, Typography } from '@mui/material'
import { Button } from 'components'
import { KeyboardArrowRight } from '@mui/icons-material'
import { useCalls } from 'hooks'
import { Area } from 'state/areas'
import { setSelectedLocation } from 'state/selectedLocation'
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
	const [selected, setSelected] = useState<Area | any>(null)

	const handleClick = async () => {
		await dispatch(setSelectedLocation(selected.coords))
		await navigate('/listing')
	}

	return (
		<>
			{/* <div className="absolute h-full w-full bg-landing bg-no-repeat bg-cover z-0 opacity-20"></div> */}
			<section
				id="home"
				className="section z-10 inset h-fit lg:h-[650px] bg-primary flex flex-col xl:px-6 lg:flex-row items-center justify-center gap-y-5 gap-x-16"
			>
				<div className="flex flex-col gap-y-6">
					<div className="flex flex-col gap-y-2 items-center my-3">
						<span className="text-[30px] lg:text-[45px] text-white font-semibold">
							{t('The best sporting app for people like you')}
						</span>
						<span className="text-[15px] lg:text-[22px] text-white font-normal">
							{t('Connect across your location and find the nearest sport event of your choice planned')}
						</span>
					</div>
					<div className="flex mx-auto w-[80%] lg:w-[50%] items-center justify-center gap-x-6">
						<Autocomplete
							id="combo-box-demo"
							className=""
							getOptionLabel={getOptionLabel}
							disableClearable
							groupBy={groupBy}
							options={options}
							loading={loading}
							onChange={(event, newValue) => setSelected(newValue)}
							renderInput={(params) => {
								console.log(params)
								return (
									<TextField
										className="bg-white border-primary rounded focused:outline-primary w-300px lg:w-2x1 text-primary"
										label="Search for location or district"
										{...params}
									/>
								)
							}}
							sx={{
								width: '80%',
							}}
						/>
						<Button
							className="btn bg-[#156495] text-white "
							variant="contained"
							disabled={!selected}
							endIcon={<KeyboardArrowRight />}
							onClick={handleClick}
						>
							<Typography>Go</Typography>
						</Button>
					</div>
				</div>
				<div className="bg-landing bg-no-repeat bg-cover w-[200px] h-[200px] mb-16"></div>
			</section>
		</>
	)
}

export default LandingPage
