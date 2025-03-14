import { useQuery } from '@tanstack/react-query'
import { MATCHES_QUERY } from '../../api/query.cons.ts'
import { MatchesService } from './matches.service.ts'

export function useMatchesQuery() {
	return useQuery({
		queryKey: [MATCHES_QUERY],
		queryFn: () => MatchesService.fetchMatched(),
		select: (data) => data
	})
}
