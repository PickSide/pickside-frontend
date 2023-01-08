import React, { FC } from 'react'
import { Box, Container, Grid, Typography } from '@mui/material'

interface PageLayoutProps extends React.PropsWithChildren {
	title?: string
}

const PageLayout: FC<PageLayoutProps> = ({ children, title }) => {
	return (
		<Container fixed>
			<Box sx={{ margin: (theme) => theme.spacing(4) }}>
				<Typography variant="headerLarge">{title}</Typography>
			</Box>
			<Box>{children}</Box>
		</Container>
	)
}

export default PageLayout
