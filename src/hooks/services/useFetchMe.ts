import { AxiosContext } from '@context'
import { setUser } from '@state'
import { useContext } from 'react'
import { useDispatch } from 'react-redux'
import { useQuery } from '@tanstack/react-query'

const useFetchMe = () => {
    const dispatch = useDispatch()
    const { axiosInstance } = useContext(AxiosContext)

    const callback = async () => await axiosInstance.get('/users/me')

    const { data: me, isLoading } = useQuery(['fetch-me'], callback, {
        onSuccess: ({ data }) => dispatch(setUser(data.result)),
        onError: () => { },
        refetchOnWindowFocus: false,
    })

    return { me, isLoading }
}

export default useFetchMe
