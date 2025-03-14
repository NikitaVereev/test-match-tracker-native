import { MatchStatus } from '@/entities/matches/api/matches.interface'
import { FC } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {Colors, Fonts, Paddings, Radius} from "@/shared/tokens";

interface ICardStatusProps {
	type: MatchStatus
}

export const CardStatus: FC<ICardStatusProps> = ({ type }) => {
	const cardStyle = () => {
		switch (type) {
			case MatchStatus.Ongoing:
				return styles.live
			case MatchStatus.Finished:
				return styles.finished
			case MatchStatus.Scheduled:
				return styles.preparing
			default:
				return styles.live
		}
	}

	const text = () => {
		switch (type) {
			case MatchStatus.Ongoing:
				return 'Live'
			case MatchStatus.Finished:
				return 'Finished'
			case MatchStatus.Scheduled:
				return 'Match preparing'
			default:
				return 'Live'
		}
	}

	return (
		<View style={{ ...styles.root, ...cardStyle() }}>
			<Text style={styles.text}>{text()}</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	root: {
		borderRadius: Radius.r4,
		paddingVertical: Paddings.p4
	},
	text: {
		fontSize: Fonts.f12,
		fontFamily: Fonts.semibold,
		color: Colors.white
	},
	live: {
		backgroundColor: Colors.green,
		paddingHorizontal: Paddings.p24
	},
	finished: {
		backgroundColor: Colors.red,
		paddingHorizontal: Paddings.p10
	},
	preparing: {
		backgroundColor: Colors.orange,
		paddingHorizontal: Paddings.p4
	}
})
