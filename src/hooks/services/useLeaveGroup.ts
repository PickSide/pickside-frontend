import { AppState, setMe } from '@state'
import { useDispatch, useSelector } from 'react-redux'

import { AxiosContext } from '@context'
import { useContext } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'

const useLeaveGroup = () => {
    const { axiosMSInstance } = useContext(AxiosContext)
    const dispatch = useDispatch()
    const { t } = useTranslation()

    const me = useSelector((state: AppState) => state.user)

    const callback = async (groupId: string) => await axiosMSInstance.delete(`/groups/${groupId}/user/${me?.id}`)

    const {
        mutate: leaveGroup,
        isLoading,
        error,
        isError,
    } = useMutation(callback, {
        mutationKey: ['leave-group'],
        onSuccess: () => {
            dispatch(setMe(null))
            dispatch({
                type: 'toast/toastMessage',
                payload: {
                    message: t('Successfully left group'),
                    type: 'success',
                },
            })
        },
        onError: (e) => dispatch({
            type: 'toast/toastMessage',
            payload: {
                message: t('Error while leaving group'),
                type: 'error',
            },
        }),
    })

    return { leaveGroup, isLoading, error, isError }
}

export default useLeaveGroup
