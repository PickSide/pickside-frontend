import { FC, createContext, useState } from 'react'

import { Activity } from '@state'

export interface AccountContext {
	focusedActivity?: Activity
	onFocusInActivity?: any
	onFocusOutActivity?: any
}

const FocusEventContext = createContext<AccountContext>({})

export const FocusEventProvider: FC<any> = ({ children }) => {
	const [focusedActivity, setFocusedActivity] = useState<Activity>()

	const onFocusInActivity = (activity: Activity) => setFocusedActivity(activity)
	const onFocusOutActivity = () => setFocusedActivity(undefined)

	return (
		<FocusEventContext.Provider value={{ focusedActivity, onFocusInActivity, onFocusOutActivity }}>
			{children}
		</FocusEventContext.Provider>
	)
}

export default FocusEventContext
