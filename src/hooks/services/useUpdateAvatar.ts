import { AppState, updateMeConfig } from '@state'
import { useDispatch, useSelector } from 'react-redux'

import { AxiosContext } from '@context'
import { useContext } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'

const useUpdateAvatar = () => {
    const dispatch = useDispatch()
    const { t } = useTranslation()
    const { axiosInstance, axiosISInstance } = useContext(AxiosContext)

    const me = useSelector((state: AppState) => state.user)

    const callback = async (formData) => await axiosISInstance.post(`users/${me?.id}`, formData)

    const {
        mutate: updateAvatar,
        isLoading,
        error,
        isError,
    } = useMutation(callback, {
        mutationKey: ['update-avatar'],
        onSuccess: async ({ data }, params) => {
            await axiosInstance.put(`users/${me?.id}/settings`, { avatar: data.path })
                .then((resp) => {
                    dispatch(updateMeConfig(resp.data.result))
                    dispatch({
                        type: 'toast/toastMessage',
                        payload: {
                            message: t(data.message),
                            type: 'success',
                        },
                    })
                })
        },
        onError: (e) => console.log(e),
    })

    return { updateAvatar, isLoading, error, isError }
}

export default useUpdateAvatar
