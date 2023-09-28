import { AxiosContext } from '@context'
import { useContext } from 'react'
import { useDispatch } from 'react-redux'
import { useMutation } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'

const useResetDb = () => {
	const { axiosInstance } = useContext(AxiosContext)
	const dispatch = useDispatch()
	const { t } = useTranslation()

	const callback = async () => await axiosInstance.post('/resetdb')

	const {
		mutate: resetDb,
		isLoading,
		error,
		isError,
	} = useMutation(callback, {
		mutationKey: ['resetDb'],
		onSuccess: () =>
			dispatch({
				type: 'toast/toastMessage',
				payload: {
					message: t('Sucessfully reset db.'),
					type: 'success',
				},
			}),
		onError: (e) => console.log(e),
	})

	return { resetDb, isLoading, error, isError }
}

export default useResetDb
