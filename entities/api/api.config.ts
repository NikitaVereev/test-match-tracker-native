const PRODUCTION = import.meta.env.VITE_APP_ENV
const SERVER_URL = PRODUCTION
	? import.meta.env.VITE_SERVICE_URL
	: import.meta.env.VITE_SERVICE_URL_DEV

export const API_URL = `${SERVER_URL}`
