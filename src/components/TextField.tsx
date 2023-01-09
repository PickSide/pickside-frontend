import { FC } from 'react'
import {
	FormControl,
	FormGroup,
	FormControlLabel,
	FormHelperText,
	TextField as MuiTextField,
	StandardTextFieldProps as MuiTextFieldProps,
} from '@mui/material'
import { omit } from 'lodash'

interface TextFieldProps extends MuiTextFieldProps {
	freeSolo?: boolean
	helperText?: string
	labelPlacement?: 'bottom' | 'end' | 'start' | 'top' | undefined
}

const TextField: FC<TextFieldProps> = ({
	freeSolo = false,
	fullWidth = false,
	helperText,
	labelPlacement = 'start',
	...props
}) => {
	return freeSolo ? (
		<MuiTextField {...props} />
	) : (
		<FormControl>
			<FormGroup>
				<FormControlLabel
					sx={{ justifyContent: 'space-between' }}
					label={props.label ?? null}
					labelPlacement={labelPlacement}
					control={<MuiTextField {...omit(props, 'label')} />}
				/>
				<FormHelperText>{helperText}</FormHelperText>
			</FormGroup>
		</FormControl>
	)
}

export default TextField
