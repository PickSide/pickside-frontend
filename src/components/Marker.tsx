import { AnimatePresence, motion } from 'framer-motion'
import { FC, MouseEventHandler, ReactNode, memo } from 'react'

import { modaleDropIn } from '@utils'
import styled from 'styled-components'

export type MarkerProps = React.HTMLAttributes<HTMLDivElement> & {
	text: string
	lat: any
	lng: any
	onClick?: MouseEventHandler
	openInfoWindow?: boolean
	icon: ReactNode
	children?: ReactNode
}

const InfoWindowWrapper = styled(motion.div)`
	position: absolute;
	bottom: 50px;
	left: -45px;
	width: 220px;
	background-color: white;
	border-radius: 4px;
	box-shadow: 0 2px 7px 1px rgba(0, 0, 0, 0.3);
	overflow: clip;
	font-size: 14px;
	cursor: ${(props) => (props.onClick ? 'pointer' : 'auto')};
	z-index: 200;
`

const Marker: FC<MarkerProps> = ({ children, openInfoWindow = false, icon, onMouseEnter, onMouseLeave, onClick, ...rest }) => {
	return (
		<AnimatePresence mode="wait">
			<div className="relative" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} onClick={onClick}>
				{icon}
				{openInfoWindow && (
					<InfoWindowWrapper id="info-window" initial="hidden" animate="visible" exit="exit" variants={modaleDropIn}>
						{children}
					</InfoWindowWrapper>
				)}
			</div>
		</AnimatePresence>
	)
}

export default memo(Marker)
