import React, { FC, useState, useMemo } from 'react'
import { Box, Container } from '@mui/material'

interface AppContainerProps {}

const AppContainer: FC<AppContainerProps> = () => {
	return (
		<Container maxWidth="md">
			<Box style={{ border: '1px solid grey', height: 600 }}></Box>
		</Container>
	)
}

export default AppContainer
