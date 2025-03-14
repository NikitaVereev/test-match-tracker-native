import axios from 'axios'
import { API_URL } from './api.config.ts'

const instance = axios.create({
	baseURL: API_URL
})

export default instance
