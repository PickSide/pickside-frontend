import React, { useContext } from 'react'

import { DeviceType } from 'context/WindowContext'
import { WindowContext } from 'context'

const useDevice = (): [device: DeviceType, orientation: Orien] => {
	const { device, orientation } = useContext(WindowContext)
	return [device, orientation]
}

export default useDevice
