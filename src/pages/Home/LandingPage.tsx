import { FC, useCallback, useState } from 'react'
import { useAsync } from 'react-use'
import { Autocomplete, Box as MuiBox, BoxProps, TextField } from '@mui/material'
import { styled } from '@mui/material/styles'
import { useCalls } from 'hooks'
import { Area } from 'state/areas'
import { orderBy } from 'lodash'

const Box = styled(MuiBox)<BoxProps>(({ theme }) => ({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'center',
	height: `calc(100vh - ${theme.mixins.toolbar.minHeight}px)`,
	backgroundColor: theme.palette.primary.main,
}))

const LandingPage: FC<any> = () => {
	const { lazyGetItems } = useCalls()
	const [options, setOptions] = useState<any>([])

	const { loading } = useAsync(async () => {
		const items = await lazyGetItems({ endpoint: 'areas' })
		if (items) {
			setOptions(orderBy<Area>(items.results, ['city', 'country', 'state'], ['asc', 'desc']))
		}
	}, [])

	const getOptionLabel = useCallback((option: Area) => `${option.district?.join(' / ')}`, [])
	const groupBy = useCallback((option: Area) => `${option.city}`, [])

	return (
		<Box>
			<Autocomplete
				id="combo-box-demo"
				getOptionLabel={getOptionLabel}
				groupBy={groupBy}
				options={options}
				loading={loading}
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
		</Box>
	)
}

export default LandingPage
