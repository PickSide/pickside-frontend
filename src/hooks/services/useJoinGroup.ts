import { useDispatch, useSelector } from 'react-redux'

import { AppState } from '@state'
import { AxiosContext } from '@context'
import { useContext } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'

const useJoinGroup = () => {
    const { axiosMSInstance } = useContext(AxiosContext)
    const dispatch = useDispatch()
    const { t } = useTranslation()

    const me = useSelector((state: AppState) => state.user)

    const callback = async (groupId: string) => await axiosMSInstance.put(`/group-join/${groupId}/user/${me?.id}`)

    const {
        mutate: joinGroup,
        isLoading,
        error,
        isError,
    } = useMutation(callback, {
        mutationKey: ['join-group'],
        onSuccess: () => {
            dispatch({
                type: 'toast/toastMessage',
                payload: {
                    message: t('Successfully joined group'),
                    type: 'success',
                },
            })
        },
        onError: ({ response: { data } }) => dispatch({
            type: 'toast/toastMessage',
            payload: {
                message: data.error,
                type: 'error',
            },
        }),
    })

    return { joinGroup, isLoading, error, isError }
}

export default useJoinGroup
