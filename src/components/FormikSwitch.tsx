import React, { FC } from 'react'
import { Field } from 'formik'
import { Box, Switch, SwitchProps, styled, FormGroup, FormControlLabel } from '@mui/material'

const ModdedMuiSwitch = styled(Switch)(({ theme }) => ({
	'& .MuiSwitch-switchBase': {
		'&.Mui-checked': {
			color: '#fff',
			'& .MuiSwitch-thumb:before': {
				backgroundImage: '',
			},
			'& + .MuiSwitch-track': {
				opacity: 1,
				backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
			},
		},
	},
	'& .MuiSwitch-thumb': {
		backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',

		'&:before': {
			content: "''",
			position: 'absolute',
			width: '100%',
			height: '100%',
			left: 0,
			top: 0,
			backgroundRepeat: 'no-repeat',
			backgroundPosition: 'center',
			backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
				'#fff',
			)}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
		},
	},
	'& .MuiSwitch-track': {
		opacity: 1,
		backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
		borderRadius: 20 / 2,
	},
}))

interface FormikSwitchProps extends SwitchProps {
	label?: string
	freeSolo?: boolean
}

const FormikSwitch: FC<FormikSwitchProps> = ({ freeSolo = false, label, name, value, ...props }) => {
	return (
		<Box display="flex">
			{!freeSolo ? (
				<Field name={name} value={value}>
					{({
						field, // { name, value, onChange, onBlur }Î
						form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
						meta,
					}) => (
						<FormGroup>
							<FormControlLabel control={<ModdedMuiSwitch sx={{ m: 1 }} {...field} />} label={label} />
						</FormGroup>
					)}
				</Field>
			) : (
				<FormGroup>
					<FormControlLabel control={<ModdedMuiSwitch sx={{ m: 1 }} {...props} />} label={label} />
				</FormGroup>
			)}
		</Box>
	)
}

export default FormikSwitch
