import React, { FC, cloneElement } from 'react'
import { Select, Toggle, TextField } from 'components'

interface SettingsInputProps {
	extraProps?: any
	type: 'date' | 'select' | 'toggle' | 'text' | string
}

const SettingsInput: FC<SettingsInputProps> = ({ extraProps, type, ...props }) => {
	const RenderElement = {
		date: {
			component: <></>,
		},
		select: {
			component: <Select {...props} {...extraProps} />,
		},
		switch: {
			component: <Toggle {...props} {...extraProps} />,
		},
		text: {
			component: <TextField {...props} {...extraProps} />,
		},
	}

	return cloneElement(RenderElement[type].component, { ...extraProps, ...props })
}

export default SettingsInput
