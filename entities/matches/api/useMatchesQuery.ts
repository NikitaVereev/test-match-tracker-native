import { useQuery, useQueryClient } from '@tanstack/react-query'
import { MATCHES_QUERY } from '../../api/query.cons.ts'
import { MatchesService } from './matches.service.ts'
import { useEffect } from 'react'
import { WSS_URL } from '@/entities/api/api.config'
import { IMatch, IMatchesWSSData } from '@/entities/matches/api/matches.interface'

export function useMatchesQuery() {
	return useQuery({
		queryKey: [MATCHES_QUERY],
		queryFn: () => MatchesService.fetchMatched(),
		select: (data) => data
	})
}

export const useMatchesQuerySubscription = () => {
	const queryClient = useQueryClient()
	useEffect(() => {
		const websocket = new WebSocket(WSS_URL)
		websocket.onopen = () => {
			console.log('connected')
		}
		websocket.onmessage = (event) => {
			const data: IMatchesWSSData = JSON.parse(event.data)

			queryClient.setQueryData<IMatch[]>(['matches_query'], (oldData) => {
				if (data.type === 'update_matches' && data.data) {
					const updatedMatches = data.data

					return oldData?.map((match) => {
						const updatedMatch = updatedMatches.find((updated) => updated.title === match.title)
						return updatedMatch ? { ...match, ...updatedMatch } : match
					})
				}
				return oldData
			})
		}

		return () => {
			websocket.close()
		}
	}, [queryClient])
}
