import { FC, Dispatch, SetStateAction } from 'react'
import { styled } from '@mui/material/styles'
import { Box, BoxProps } from '@mui/material'

interface NavbarProps {
	setOpenAuthenticationDialog?: Dispatch<SetStateAction<boolean>>
}

const StyledNavbarWrapper = styled(Box)<BoxProps>(({ theme }) => ({
	display: 'flex',
	flexDirection: 'row',
	alignItems: 'center',
	flexGrow: 1,
	flexBasis: 'auto',
	backgroundColor: theme.palette.primary.main,
	minHeight: theme.mixins.toolbar.minHeight,
	paddingInlineEnd: theme.spacing(2),
}))
const NavbarWrapper: FC<any> = ({ children, ...props }) => {
	return <StyledNavbarWrapper {...props}>{children}</StyledNavbarWrapper>
}

export default NavbarWrapper
