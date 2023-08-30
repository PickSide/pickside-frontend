import { resetDb as reset } from '@api'
import { useMutation } from 'react-query'

const useResetDb = () => {
	const { mutate: resetDb, isLoading, isSuccess, isError } = useMutation(['resetDb'], reset)

	return { resetDb, isLoading, isSuccess, isError }
}

export default useResetDb
