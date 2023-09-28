export const toastMiddleware = (store) => (next) => (action) => {
	const ACTIONS_TO_TOAST = {
		'activities/addActivities': {
			message: 'Successfully created activity',
			type: 'success',
		},
		'activities/addSelfToActivity': {
			message: 'You registered to activity',
			type: 'success',
		},
		'activities/removeSelfFromActivity': {
			message: 'You removed yourself from activity',
			type: 'success',
		},
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
		// 'user/updateUserConfig': {
		//     message: 'Updated settings',
		//     type: 'success'
		// }
	}

	if (ACTIONS_TO_TOAST[action.type]) {
		store.dispatch({ type: 'toast/toastMessage', payload: ACTIONS_TO_TOAST[action.type] })
	}

	next(action)
}
