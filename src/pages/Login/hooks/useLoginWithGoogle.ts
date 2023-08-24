import { Dispatch } from '@reduxjs/toolkit'
import { postItem } from '@api'
import { setUser } from '@state'

const useLoginWithGoogle = () => {
	return (data) =>
		async (dispatch: Dispatch): Promise<any> => {
			return await postItem({ endpoint: 'googlelogin', data })(dispatch)
				.then((response) => {
					if (response) {
						dispatch<any>(setUser(response))
					}
					return response
				})
				.catch((error) => console.log(error))
		}
}

export default useLoginWithGoogle
