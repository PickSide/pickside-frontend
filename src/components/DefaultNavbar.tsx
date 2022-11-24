import react, { FC, useState, Dispatch, SetStateAction } from 'react'
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles'
import { Box, BoxProps } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { Login as LoginIcon } from '@mui/icons-material'

interface NavbarProps {
	setOpenAuthenticationDialog?: Dispatch<SetStateAction<boolean>>
}

const StyledDefaultNavbar = styled(Box)<BoxProps>(({ theme }) => ({
	display: 'flex',
	flexDirection: 'row',
	alignItems: 'center',
	flexGrow: 1,
	flexBasis: 'auto',
	backgroundColor: theme.palette.primary.main,
	minHeight: theme.mixins.toolbar.minHeight,
	paddingInlineEnd: theme.spacing(2),
}))
const DefaultNavbar: FC<any> = ({ children, ...props }) => {
	return <StyledDefaultNavbar {...props}>{children}</StyledDefaultNavbar>
}

export default DefaultNavbar
