import { FC, MouseEventHandler, ReactNode } from 'react'

import PropTypes from 'prop-types'

interface MarkerProps {
	text: string
	lat: any
	lng: any
	onClick?: MouseEventHandler
	icon: ReactNode
}

const Marker: FC<MarkerProps> = ({ text, onClick, icon }) => <div onClick={onClick}>{icon}</div>

Marker.defaultProps = {
	onClick: undefined,
}

Marker.propTypes = {
	onClick: PropTypes.func,
	text: PropTypes.string.isRequired,
}

export default Marker
