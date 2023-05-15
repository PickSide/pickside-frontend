import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Paper } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { AppState, setSelectedSport } from 'state'

const SportSelection = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const { t } = useTranslation()
	const sports = useSelector((state: AppState) => state.sports)

	const handleClick = async (e, value) => {
		await dispatch<any>(setSelectedSport(value))
		await navigate('/listing')
	}

	return (
		<section id="selection" className="flex flex-col section h-fit xl:h-[600px] gap-y-4">
			<span className="text-[25px] lg:text-[45px] font-semibold">{t('Popular sports')}</span>
			<span className="text-[20px] lg:text-[35px] font-normal">
				{t('Select your sport and start scouting for matches')}
			</span>
			<div className="flex flex-col xl:flex-row gap-x-10 gap-y-10 items-center m-auto">
				{sports?.results?.map((sport, idx) =>
					sport.featureAvailable ? (
						<Paper
							key={idx}
							elevation={3}
							onClick={(e) => handleClick(e, sport.value)}
							className="flex bg-primary text-white w-64 h-28 btn text-[20px] m-auto justify-center items-center hover:bg-accent cursor-pointer"
						>
							<span>{sport.description}</span>
						</Paper>
					) : (
						<Paper
							key={idx}
							elevation={3}
							className="flex flex-col bg-primary opacity-30 text-white w-64 h-28 btn text-[20px] m-auto justify-center items-center cursor-not-allowed"
						>
							<span>{sport.description}</span>
							<span className="text-[10px]">{t('Feature is not available yet')}</span>
						</Paper>
					),
				)}
			</div>
		</section>
	)
}

export default SportSelection
