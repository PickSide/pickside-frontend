import { Dispatch } from '@reduxjs/toolkit'
import { postItem } from '@api'
import { setUser } from '@state'

const useLogin = () => {
	return (data) =>
		async (dispatch: Dispatch): Promise<any> => {
			return await postItem({ endpoint: 'login', data })(dispatch)
				.then((response) => {
					if (response) {
						dispatch<any>(setUser(response))
					}
					return response
				})
				.catch((error) => console.log(error))
		}
}

export default useLogin
