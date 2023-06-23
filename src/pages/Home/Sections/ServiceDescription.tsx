import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
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
			<div className="flex flex-col xl:flex-row gap-x-10 gap-y-10 items-center m-auto"></div>
		</section>
	)
}

export default SportSelection
