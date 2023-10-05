import { FC, MouseEventHandler, ReactNode, memo } from 'react'

import PropTypes from 'prop-types'
import { modaleDropIn } from '@utils'
import { motion } from 'framer-motion'
import styled from 'styled-components'

export interface MarkerProps extends React.HTMLAttributes<HTMLDivElement> {
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
	z-index: 100;
`

const Marker: FC<MarkerProps> = ({ children, openInfoWindow = false, text, icon, ...rest }) => {
	return (
		<div className="relative" onMouseEnter={rest.onMouseEnter} onMouseLeave={rest.onMouseLeave}>
			{icon}
			{openInfoWindow && (
				<InfoWindowWrapper initial="hidden" animate="visible" exit="exit" variants={modaleDropIn}>
					{children}
				</InfoWindowWrapper>
			)}
		</div>
	)
}

Marker.defaultProps = {
	onClick: undefined,
}

Marker.propTypes = {
	onClick: PropTypes.func,
	text: PropTypes.string.isRequired,
}

export default memo(Marker)
