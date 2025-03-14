import { MatchStatus } from '@/entities/matches/api/matches.interface'
import { FC, useEffect, useRef, useState } from 'react'
import { Animated, StyleSheet, Text, View } from 'react-native'
import { CardStatus } from '@/shared'
import { Colors, Fonts, Gaps } from '@/shared/tokens'

interface IScoreProps {
	awayScore: number
	homeScore: number
	status: MatchStatus
}

export const Score: FC<IScoreProps> = (props) => {
	const { awayScore, homeScore, status } = props

	const animatedHomeScore = useRef(new Animated.Value(homeScore)).current
	const animatedAwayScore = useRef(new Animated.Value(awayScore)).current

	const [displayHomeScore, setDisplayHomeScore] = useState(homeScore)
	const [displayAwayScore, setDisplayAwayScore] = useState(awayScore)

	useEffect(() => {
		Animated.timing(animatedHomeScore, {
			toValue: homeScore,
			duration: 300,
			useNativeDriver: false
		}).start()

		Animated.timing(animatedAwayScore, {
			toValue: awayScore,
			duration: 300,
			useNativeDriver: false
		}).start()

		const homeScoreListener = animatedHomeScore.addListener(({ value }) => {
			setDisplayHomeScore(Math.round(value))
		})

		const awayScoreListener = animatedAwayScore.addListener(({ value }) => {
			setDisplayAwayScore(Math.round(value))
		})

		return () => {
			animatedHomeScore.removeListener(homeScoreListener)
			animatedAwayScore.removeListener(awayScoreListener)
		}
	}, [homeScore, awayScore])

	return (
		<View style={styles.root}>
			<View>
				<Text style={styles.text}>{`${displayHomeScore} : ${displayAwayScore}`}</Text>
			</View>
			<CardStatus type={status} />
		</View>
	)
}

const styles = StyleSheet.create({
	root: {
		rowGap: Gaps.g4,
		alignItems: 'center'
	},
	text: {
		fontSize: Fonts.f14,
		fontFamily: Fonts.semibold,
		color: Colors.white
	}
})
