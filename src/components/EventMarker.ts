import { FC, memo } from 'react'
import Marker, { MarkerProps } from './Marker'

import { Activity } from '@state'
import PropTypes from 'prop-types'

interface EventMarkerProps extends MarkerProps {
	activity: Activity
}

const EventMarker: FC<EventMarkerProps> = ({ activity, ...rest }) => {
	const handleOnMouseEnter = async () => onHover && onHover(activity.id)

	return <Marker {...rest} />
}

Marker.defaultProps = {
	onClick: undefined,
}

Marker.propTypes = {
	onClick: PropTypes.func,
	text: PropTypes.string.isRequired,
}

export default memo(EventMarker)
