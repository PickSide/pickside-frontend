import React, { FC, useState, useMemo } from 'react'
import { StarBorder } from '@mui/icons-material';
import { Card as MuiCard, CardMedia as MuiCardMedia, CardActionArea as MuiCardActionArea, CardContent as MuiCardContent, Typography } from '@mui/material'
interface CardProps { }


const Card: FC<CardProps> = () => {
	return (
		<MuiCard>
			<MuiCardMedia
				component="img"
				alt="placeholder"
				image="/monkey.jpeg"
				width={563}
				height={317}
			/>
			<MuiCardContent>
				<Typography>
					{[0, 1, 2, 3, 4].map((x) => <StarBorder />)}
				</Typography>
			</MuiCardContent>
		</MuiCard>
	)
}

export default Card
