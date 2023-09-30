export const toastMiddleware = (store) => (next) => (action) => {
	const ACTIONS_TO_TOAST = {
		'activities/updateActivity': {
			message: 'Updated activity',
			type: 'success',
		},
		'deactivate/deactivate': {
			message: 'Account successfully deactivated. You can now logout',
			type: 'success',
		},
		'user/setUser': {
			message: 'Successfully logged in',
			type: 'success',
		},
		'user/setUserEmpty': {
			message: 'Successfully logged out',
			type: 'success',
		},
	}

	if (ACTIONS_TO_TOAST[action.type]) {
		store.dispatch({ type: 'toast/toastMessage', payload: ACTIONS_TO_TOAST[action.type] })
	}

	next(action)
}
