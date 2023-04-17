import { FC, useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAsync } from 'react-use'
import { Autocomplete, Box as MuiBox, BoxProps, Button, TextField, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { KeyboardArrowRight } from '@mui/icons-material'
import { useCalls } from 'hooks'
import { Area } from 'state/areas'
import { setSelectedDistrict } from 'state/selectedDistrict'
import { orderBy } from 'lodash'
import { useDispatch } from 'react-redux'

const Box = styled(MuiBox)<BoxProps>(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	height: `calc(100vh - ${theme.mixins.toolbar.minHeight}px)`,
	flexWrap: 'nowrap',
	gap: 40,
}))

const LandingPage: FC<any> = () => {
	const { lazyGetItems } = useCalls()
	const dispatch = useDispatch()
	const navigate = useNavigate()
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
		await dispatch(setSelectedDistrict(selected.districtCode))
		await navigate('/home')
	}

	return (
		<Box>
			<Autocomplete
				id="combo-box-demo"
				getOptionLabel={getOptionLabel}
				disableClearable
				groupBy={groupBy}
				options={options}
				loading={loading}
				onChange={(event, newValue) => setSelected(newValue)}
				renderInput={(params) => (
					<TextField
						{...params}
						label="Search for location or district"
						InputProps={{
							...params.InputProps,
							type: 'search',
						}}
					/>
				)}
				sx={{
					width: '80%',
				}}
			/>
			<Button variant="contained" disabled={!selected} endIcon={<KeyboardArrowRight />} onClick={handleClick}>
				<Typography>Go</Typography>
			</Button>
		</Box>
	)
}

export default LandingPage
