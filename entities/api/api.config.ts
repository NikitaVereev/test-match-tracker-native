const PRODUCTION = process.env.EXPO_PUBLIC_API_APP_ENV === 'production'
const SERVER_URL = PRODUCTION
	? process.env.EXPO_PUBLIC_API_SERVICE_URL
	: process.env.EXPO_PUBLIC_API_SERVICE_URL_DEV
const SERVER_WSS_URL = PRODUCTION
	? process.env.EXPO_PUBLIC_API_SERVICE_WSS_URL
	: process.env.EXPO_PUBLIC_API_SERVICE_WSS_URL

export const API_URL = `${SERVER_URL}`
export const WSS_URL = `${SERVER_WSS_URL}`
