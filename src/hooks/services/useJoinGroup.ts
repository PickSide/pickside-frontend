import { AppState, setMe } from '@state'
import { AxiosContext, SocketContext } from '@context'
import { useDispatch, useSelector } from 'react-redux'

import { useContext } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'

const useJoinGroup = () => {
    const { axiosInstance } = useContext(AxiosContext)
    const dispatch = useDispatch()
    const { t } = useTranslation()

    const connectedUser = useSelector((state: AppState) => state.user)

    const callback = async (groupId: string) => await axiosInstance.post(`/groups/join`, { groupId, userId: connectedUser?.id })

    const {
        mutate: joinGroup,
        isLoading,
        error,
        isError,
    } = useMutation(callback, {
        mutationKey: ['join-group'],
        onSuccess: () => {
            dispatch(setMe(null))
            dispatch({
                type: 'toast/toastMessage',
                payload: {
                    message: t('Successfully joined group'),
                    type: 'success',
                },
            })
        },
        onError: (e) => dispatch({
            type: 'toast/toastMessage',
            payload: {
                message: t('Error while joinin group'),
                type: 'error',
            },
        }),
    })

    return { joinGroup, isLoading, error, isError }
}

export default useJoinGroup
