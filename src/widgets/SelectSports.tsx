import React, { FC, useEffect } from 'react'
import { useAsync } from 'react-use'
import { MenuItem, TextField } from '@mui/material'
import { fetchAllSports } from 'state/sport'
import { useDispatch, useSelector } from 'react-redux'
import { AppState } from 'state'
import { useTranslation } from 'react-i18next'

const SelectSports: FC<any> = ({ ...props }) => {
	const dispatch = useDispatch()
	const { t } = useTranslation()

	const sports = useSelector((state: AppState) => state.sports)

	const { loading } = useAsync(async () => {
		if (!sports) {
			dispatch<any>(fetchAllSports())
		}
	}, [])

	return (
		<TextField select label={t('Sport')}>
			{loading ? (
				<MenuItem>{`${t('Loading')}...`}</MenuItem>
			) : (
				sports?.results?.map((sport, idx) => (
					<MenuItem key={idx} value={sport.id}>
						{sport.description}
					</MenuItem>
				))
			)}
		</TextField>
	)
}

export default SelectSports
