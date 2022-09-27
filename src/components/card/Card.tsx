import React, { FC, useState, useMemo } from 'react'
import { Box, Container } from '@mui/material'

interface CardProps {}

const Card: FC<CardProps> = () => {
	return (
		<Container maxWidth="md">
			<Box style={{ backgroundColor: 'black' }}>HIII</Box>
		</Container>
	)
}

export default Card
