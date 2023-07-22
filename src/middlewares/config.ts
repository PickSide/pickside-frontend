import { merge } from 'lodash'

export const configMiddleware = (store) => (next) => (action) => {
    if (action.type === 'user/updateConfig') {
        console.log(action)
    }

    if (action.type === 'user/updateFavorite') {
        console.log(action)
    }

    next(action)
}