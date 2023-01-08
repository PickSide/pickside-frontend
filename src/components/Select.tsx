import { FC } from 'react'
import {
	FormControl,
	FormGroup,
	FormControlLabel,
	FormHelperText,
	Select as MuiSelect,
	SelectProps as MuiSelectProps,
} from '@mui/material'

interface SelectProps extends MuiSelectProps {
	freeSolo?: boolean
	helperText?: string
	label?: string
	labelPlacement?: 'bottom' | 'end' | 'start' | 'top' | undefined
}

const Select: FC<SelectProps> = ({
	freeSolo = false,
	helperText,
	label,
	labelPlacement = 'start',
	children,
	...props
}) => {
	return freeSolo ? (
		<MuiSelect {...props}>{children}</MuiSelect>
	) : (
		<FormControl>
			<FormGroup>
				<FormControlLabel
					sx={{ justifyContent: 'space-between' }}
					label={label}
					labelPlacement={labelPlacement}
					control={<MuiSelect {...props}>{children}</MuiSelect>}
				/>
				<FormHelperText>{helperText}</FormHelperText>
			</FormGroup>
		</FormControl>
	)
}

export default Select
