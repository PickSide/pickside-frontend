import { FC } from 'react'
import {
	FormControl,
	FormGroup,
	FormControlLabel,
	FormHelperText,
	TextField as MuiTextField,
	StandardTextFieldProps as MuiTextFieldProps,
	styled,
} from '@mui/material'
import { omit } from 'lodash'

interface TextFieldProps extends MuiTextFieldProps {
	freeSolo?: boolean
	helperText?: string
	labelPlacement?: 'bottom' | 'end' | 'start' | 'top' | undefined
}

const StyledTextField = styled(MuiTextField)({
	root: {
		'& label': {},
	},
})

const TextField: FC<TextFieldProps> = ({
	freeSolo = false,
	fullWidth = false,
	helperText,
	labelPlacement = 'start',
	...props
}) => {
	return freeSolo ? (
		<StyledTextField {...props} InputLabelProps={{ shrink: true }} />
	) : (
		<FormControl>
			<FormGroup>
				<FormControlLabel
					sx={{ justifyContent: 'space-between' }}
					label={props.label ?? null}
					labelPlacement={labelPlacement}
					control={
						<StyledTextField
							InputLabelProps={{ sx: { fontSize: '1.6vh', top: '-1.6vh', '&.MuiInputLabel-shrink': { top: 0 } } }}
							{...omit(props, ['label'])}
						/>
					}
				/>
				<FormHelperText>{helperText}</FormHelperText>
			</FormGroup>
		</FormControl>
	)
}

export default TextField
