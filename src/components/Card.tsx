import React, { FC, useState, useMemo } from 'react'
import { StarBorder } from '@mui/icons-material'
import {
	Button,
	Card as MuiCard,
	CardMedia as MuiCardMedia,
	CardActionArea as MuiCardActionArea,
	CardContent as MuiCardContent,
	Grid,
	Typography,
} from '@mui/material'
interface CardProps {}

const Card: React.ElementType<CardProps> = () => {
	return (
		<MuiCard>
			<MuiCardMedia width={580} height={320} component="img" alt="placeholder" image="/monkey.jpeg" />
			<MuiCardContent>
				<Grid container>
					<Grid item container direction="column" xs={8}>
						<Grid item>
							<Typography>
								{[0, 1, 2, 3, 4].map((x) => (
									<StarBorder />
								))}
							</Typography>
						</Grid>
						<Grid item>
							<Typography>0/16</Typography>
						</Grid>
					</Grid>
					<Grid item container justifyContent="center" alignItems="center" xs={4}>
						<Button>Register</Button>
					</Grid>
				</Grid>
			</MuiCardContent>
		</MuiCard>
	)
}

export default Card
