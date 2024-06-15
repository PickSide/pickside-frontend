import { AxiosError } from 'axios'

export interface IErrorResponse {
	statusCode: string
	msg: string | any
}

export function handleResponseError(error: AxiosError<IErrorResponse>) {
	if (!error) {
		return 'Unkown error'
	}

	return error
}
