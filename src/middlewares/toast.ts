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
        'account/setAccount': {
            message: 'Successfully logged in',
            type: 'success'
        },
        'account/updateConfig': {
            message: 'Updated settings',
            type: 'success'
        }
    }

    if (ACTIONS_TO_TOAST[action.type]) {
        store.dispatch({ type: 'toast/toastMessage', payload: ACTIONS_TO_TOAST[action.type] })
    }

    next(action)
}
