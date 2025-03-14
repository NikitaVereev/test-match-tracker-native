export enum MatchStatus {
	Ongoing = 'Ongoing',
	Finished = 'Finished',
	Scheduled = 'Scheduled'
}


export interface IMatchPlayer {
	kills: number
	username: string
}

export interface IMatchTeam {
	name: string
	place: number
	players: IMatchPlayer[]
	points: number
	total_kills: number
}

export interface IMatch {
	awayScore: number
	awayTeam: IMatchTeam
	homeScore: number
	homeTeam: IMatchTeam
	status: MatchStatus
	time: string
	title: string
}

export interface IMatches {
	matches: IMatch[]
}

export interface IMatchesResponse {
	data: IMatches
	ok: boolean
}
