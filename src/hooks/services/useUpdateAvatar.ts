import { AppState, updateMeConfig } from '@state'
import { useDispatch, useSelector } from 'react-redux'

import { AxiosContext } from '@context'
import { handleResponseError } from '@utils'
import { useContext } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'

const useUpdateAvatar = () => {
    const dispatch = useDispatch()
    const { t } = useTranslation()
    const { axiosMSInstance, axiosFSInstance } = useContext(AxiosContext)

    const me = useSelector((state: AppState) => state.user)

    const callback = async (formData) => await axiosFSInstance.put(`/users/${me?.id}/avatar`, formData)

    const {
        mutate: updateAvatar,
        isLoading,
        error,
        isError,
    } = useMutation(callback, {
        mutationKey: ['update-avatar'],
        onSuccess: async ({ data }) => {
            await axiosMSInstance.put(`/users/${me?.id}/settings`, { avatar: data.result })
                .then((resp) => {
                    console.log()
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
        onError: (e: any) => handleResponseError(e),
    })

    return { updateAvatar, isLoading, error, isError }
}

export default useUpdateAvatar
