import { IMatch, MatchStatus } from '@/entities/matches/api/matches.interface'

export const filterMatchesByStatus = (
	matches: IMatch[] | undefined,
	selectedStatus: MatchStatus
): IMatch[] | undefined => {
	if (!matches) return undefined

	if (selectedStatus === MatchStatus.ALL) {
		return matches
	}

	return matches.filter((match) => match.status === selectedStatus)
}
