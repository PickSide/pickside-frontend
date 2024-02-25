import { DeviceType } from '@context/WindowContext'
import { WindowContext } from '@context'
import { useContext } from 'react'

const useDevice = (): [device: DeviceType, orientation: any] => {
	const { device, orientation } = useContext(WindowContext)
	return [device, orientation]
}

export default useDevice
