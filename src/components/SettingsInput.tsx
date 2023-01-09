import React, { FC, cloneElement } from 'react'
import { DatePicker, Select, Switch, TextField } from 'components'

interface SettingsInputProps {
	extraProps?: any
	type: 'date' | 'select' | 'toggle' | 'text' | string
}

const SettingsInput: FC<SettingsInputProps> = ({ extraProps, type, ...props }) => {
	const RenderElement = {
		date: {
			component: <DatePicker {...props} {...extraProps} />,
		},
		select: {
			component: <Select {...props} {...extraProps} />,
		},
		switch: {
			component: <Switch {...props} {...extraProps} />,
		},
		text: {
			component: <TextField {...props} {...extraProps} />,
		},
	}

	return cloneElement(RenderElement[type].component, { ...extraProps, ...props })
}

export default SettingsInput
