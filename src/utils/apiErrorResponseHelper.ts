export interface IErrorResponse {
	failReason: string
	message: string
	status: number
}

export interface IApiError {
	context: string
	error: IErrorResponse
	jobStatus: string
	timeStamp: string
}

export function handleResponseError(error: any) {
	if (!error.response?.data) {
		return Promise.resolve('Unkown error')
	}

	const errorResponse = error.response?.data

	return errorResponse.error
}
