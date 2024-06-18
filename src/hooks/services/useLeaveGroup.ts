import { AppState, removeGroup } from '@state'
import { useDispatch, useSelector } from 'react-redux'

import { AxiosContext } from '@context'
import { useContext } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'

const useLeaveGroup = () => {
    const { extsvcInstance } = useContext(AxiosContext)
    const dispatch = useDispatch()
    const { t } = useTranslation()

    const me = useSelector((state: AppState) => state.user)

    const callback = async (groupId: string) => await extsvcInstance.delete(`/groups/leave/${groupId}/users/${me?.id}`)

    const {
        mutate: leaveGroup,
        isLoading,
        error,
        isError,
    } = useMutation(callback, {
        mutationKey: ['leave-group'],
        onSuccess: ({ data }, groupId) => {
            dispatch(removeGroup(groupId))
            dispatch({
                type: 'toast/toastMessage',
                payload: {
                    message: t(data.message),
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
