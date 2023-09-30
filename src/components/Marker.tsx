import { FC, MouseEventHandler, ReactNode, useState } from 'react'

import Icon from './shared/Icon'
import IconButton from './shared/IconButton'
import PropTypes from 'prop-types'
import styled from 'styled-components'

interface MarkerProps {
	text: string
	lat: any
	lng: any
	onClick?: MouseEventHandler
	icon: ReactNode
	children?: ReactNode
}

const InfoWindowWrapper = styled.div`
	position: relative;
	bottom: 100px;
	left: -45px;
	width: 220px;
	background-color: white;
	border-radius: 8px;
	box-shadow: 0 2px 7px 1px rgba(0, 0, 0, 0.3);
	padding: 10px;
	font-size: 14px;
	cursor: ${(props) => (props.onClick ? 'pointer' : 'auto')};
	z-index: 100;
`

const Marker: FC<MarkerProps> = ({ children, text, icon }) => {
	const [show, setShow] = useState<boolean>(false)

	const open = () => setShow(true)
	const close = () => setShow(false)

	return (
		<div onClick={open}>
			{icon}
			{show && (
				<InfoWindowWrapper>
					<IconButton className="absolute right-2 -top-1" icon={<Icon icon="close" />} onClick={close} />
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

export default Marker
