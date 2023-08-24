import { Dispatch } from '@reduxjs/toolkit'
import { postItem } from '@api'

const useSignup = () => {
	return (data: any) =>
		async (dispatch: Dispatch): Promise<any> => {
			return await postItem({ endpoint: 'users/create', data })(dispatch).then((response) => {
				return response
			})
		}
}

export default useSignup
