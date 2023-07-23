import { pick } from 'lodash'

export const authMiddleware = (store) => (next) => (action) => {
    if (action.type === 'user/setUser') {
        clearCachedUser()
        console.log(pick(action.payload, ['user']))
        window.localStorage.setItem('auth', JSON.stringify({ ...action.payload, }))
        window.localStorage.setItem('user', JSON.stringify({ ...action.payload.user }))
        action.payload = action.payload.user
    }

    if (action.type === 'user/setUserEmpty') {
        clearCachedUser()
    }

    if (action.type === 'user/deactivate') {
        clearCachedUser()
    }

    next(action)
}

function clearCachedUser() {
    window.localStorage.removeItem('auth')
    window.localStorage.removeItem('user')
}