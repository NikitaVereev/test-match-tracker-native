import { AxiosError } from 'axios'

export const errorCatch = (error: AxiosError): string => {
	const message = error?.message

	return message
		? typeof error.response.data.message === 'object'
			? message[0]
			: message
		: error.message
}
