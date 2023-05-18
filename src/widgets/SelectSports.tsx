import React, { FC, useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { Select, MenuItem } from 'components'
import { AppState } from 'state'
import InitialAppStateContext from 'context/InitialAppStateContext'

const SelectSports: FC<any> = ({ ...props }) => {
	const { t } = useTranslation()
	const { loading } = useContext(InitialAppStateContext)
	const sports = useSelector((state: AppState) => state.sports)

	return (
		<Select freeSolo id="sport-select" label={t('Sport')}>
			{loading ? (
				<MenuItem>{`${t('Loading')}...`}</MenuItem>
			) : (
				sports?.results?.map((sport, idx) => <MenuItem key={idx}>{sport.description}</MenuItem>)
			)}
		</Select>
	)
}

export default SelectSports
