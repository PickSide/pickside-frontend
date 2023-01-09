import React, { FC, useEffect } from 'react'
import { useAsync } from 'react-use'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { MenuItem, TextField } from '@mui/material'
import { Select } from 'components'
import { AppState } from 'state'
import { fetchAllSports } from 'state/sport'

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
		<Select freeSolo placeholder={t('Sport')}>
			{loading ? (
				<MenuItem>{`${t('Loading')}...`}</MenuItem>
			) : (
				sports?.results?.map((sport, idx) => (
					<MenuItem key={idx} value={sport.id}>
						{sport.description}
					</MenuItem>
				))
			)}
		</Select>
	)
}

export default SelectSports
