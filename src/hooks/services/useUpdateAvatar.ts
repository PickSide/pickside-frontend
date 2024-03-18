import { AppState, updateMeConfig } from '@state'
import { useDispatch, useSelector } from 'react-redux'

import { AxiosContext } from '@context'
import { useContext } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'

const useUpdateAvatar = () => {
    const dispatch = useDispatch()
    const { t } = useTranslation()
    const { axiosInstance } = useContext(AxiosContext)

    const me = useSelector((state: AppState) => state.user)

    const callback = async (data) => await axiosInstance.put(`users/${me?.id}/avatar`, { data })

    const {
        mutate: updateAvatar,
        isLoading,
        error,
        isError,
    } = useMutation(callback, {
        mutationKey: ['update-avatar'],
        onSuccess: ({ data }, params) => {
            dispatch(updateMeConfig(params))
            dispatch({
                type: 'toast/toastMessage',
                payload: {
                    message: t(data.message),
                    type: 'success',
                },
            })
        },
        onError: (e) => console.log(e),
    })

    return { updateAvatar, isLoading, error, isError }
}

export default useUpdateAvatar
