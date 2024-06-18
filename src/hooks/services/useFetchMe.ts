import { AxiosContext } from '@context'
import { setMe } from '@state'
import { useContext } from 'react'
import { useDispatch } from 'react-redux'
import { useLocalStorage } from 'usehooks-ts'
import { useQuery } from '@tanstack/react-query'

const useFetchMe = () => {
	const dispatch = useDispatch()
	const { extsvcInstance } = useContext(AxiosContext)
	const [bearer] = useLocalStorage('my-bearer-token', null)

	const callback = async () =>
		await extsvcInstance.get('/me', {
			headers: {
				Authorization: `Bearer ${bearer || ''}`,
			},
		})

	const {
		data: me,
		isLoading,
		refetch: refetchMe,
	} = useQuery(['fetch-me'], callback, {
		enabled: !!bearer,
		onSuccess: ({ data }) => dispatch(setMe(data.result.user)),
		onError: () => {},
		refetchOnWindowFocus: false,
	})

	return { me, isLoading, refetchMe }
}

export default useFetchMe
