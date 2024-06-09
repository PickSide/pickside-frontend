export interface IErrorResponse {
	response: {
		data: {
			statusCode: string
			msg: string | any
			status: number
		}
	}
}

export interface IApiError {
	context: string
	error: IErrorResponse
	jobStatus: string
	timeStamp: string
}

export function handleResponseError(error: IErrorResponse) {
	if (!error.response?.data) {
		return Promise.resolve('Unkown error')
	}

	return error.response?.data
}
