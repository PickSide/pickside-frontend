export const toastMiddleware = (store) => (next) => (action) => {
    const ACTIONS_TO_TOAST = {
        'activities/addActivities': {
            message: 'Successfully created activity',
            type: 'success'
        },
        'activities/updateActivity': {
            message: 'Updated activity',
            type: 'success'
        },
        'user/setUser': {
            message: 'Successfully logged in',
            type: 'success'
        },
        'user/updateConfig': {
            message: 'Updated settings',
            type: 'success'
        }
    }

    if (ACTIONS_TO_TOAST[action.type]) {
        store.dispatch({ type: 'toast/toastMessage', payload: ACTIONS_TO_TOAST[action.type] })
    }

    next(action)
}
