import { request } from '../../api/request.ts'
import { IMatchesResponse } from './matches.interface.ts'

export const MatchesService = {
	async fetchMatched() {
		const response = await request<IMatchesResponse>({
			url: '/fronttemp',
			method: 'GET'
		})
		return response.data.matches
	}
}
