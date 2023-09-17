import { resetDb as reset } from '@api/axiosInstance'
import { useMutation } from '@tanstack/react-query'

const useResetDb = () => {
	const { mutate: resetDb, isLoading, isSuccess, isError } = useMutation(['resetDb'], reset)

	return { resetDb, isLoading, isSuccess, isError }
}

export default useResetDb
