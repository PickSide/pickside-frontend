import { FC, createContext, useState } from 'react'

import { Activity } from '@state'

export interface FocusEventContextProps {
	focusedActivity?: Activity
	onFocusInActivity?: any
	onFocusOutActivity?: any
}

const FocusEventContext = createContext<FocusEventContextProps>({})

export const FocusEventProvider: FC<any> = ({ children }) => {
	const [focusedActivity, setFocusedActivity] = useState<Activity>()

	const onFocusInActivity = (value) => setFocusedActivity(value)
	const onFocusOutActivity = () => setFocusedActivity(undefined)

	return (
		<FocusEventContext.Provider value={{ focusedActivity, onFocusInActivity, onFocusOutActivity }}>
			{children}
		</FocusEventContext.Provider>
	)
}

export default FocusEventContext
