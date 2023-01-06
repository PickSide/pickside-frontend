import { FC } from 'react'
import { Switch as MuiSwitch, SwitchProps as MuiSwitchProps, Tooltip } from '@mui/material'
import { styled } from '@mui/material/styles'

interface SwitchProps extends MuiSwitchProps {
	dense?: boolean
	tooltip?: boolean
	tooltipHelperText?: string
}

const IOSSwitch = styled(({ dense = false, ...props }: SwitchProps) => (
	<MuiSwitch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme, dense }) => ({
	width: 42,
	height: 26,
	padding: 0,
	margin: dense ? theme.spacing(2) : 'inherit',
	'& .MuiSwitch-switchBase': {
		padding: 0,
		margin: 2,
		transitionDuration: '300ms',
		'&.Mui-checked': {
			transform: 'translateX(16px)',
			color: '#fff',
			'& + .MuiSwitch-track': {
				backgroundColor: theme.palette.mode === 'dark' ? theme.palette.primary.dark : theme.palette.primary.main,
				opacity: 1,
				border: 0,
			},
			'&.Mui-disabled + .MuiSwitch-track': {
				opacity: 0.5,
			},
		},
		'&.Mui-focusVisible .MuiSwitch-thumb': {
			color: '#33cf4d',
			border: '6px solid #fff',
		},
		'&.Mui-disabled .MuiSwitch-thumb': {
			color: theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[600],
		},
		'&.Mui-disabled + .MuiSwitch-track': {
			opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
		},
	},
	'& .MuiSwitch-thumb': {
		boxSizing: 'border-box',
		width: 22,
		height: 22,
	},
	'& .MuiSwitch-track': {
		borderRadius: 26 / 2,
		backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
		opacity: 1,
		transition: theme.transitions.create(['background-color'], {
			duration: 300,
		}),
	},
	'& .MuiButtonBase-root:hover': {
		background: 'none',
	},
	'& .MuiSvgIcon-root': {
		margin: -1,
		color: theme.palette.primary.main,
	},
}))

const Switch: FC<SwitchProps> = ({ tooltip = false, tooltipHelperText, ...props }) => {
	return (
		<>
			{tooltip && tooltipHelperText ? (
				<Tooltip title={tooltipHelperText}>
					<IOSSwitch {...props} />
				</Tooltip>
			) : (
				<IOSSwitch {...props} />
			)}
		</>
	)
}
export default Switch