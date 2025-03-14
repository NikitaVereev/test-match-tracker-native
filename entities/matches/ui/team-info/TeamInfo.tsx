import { IMatchTeam } from '@/entities/matches/api/matches.interface'
import { FC, useEffect, useRef, useState } from 'react'
import { FlatList, StyleSheet, Text, View, Animated } from 'react-native'
import { PlayerInfo } from '@/entities/matches/ui/player-info/PlayerInfo'
import { Colors, Fonts, Gaps, Paddings, Radius } from '@/shared/tokens'

type ICommandInfoProps = Omit<IMatchTeam, 'name'>

export const TeamInfo: FC<ICommandInfoProps> = (props) => {
	const { players, points, total_kills, place } = props

	const animatedPoints = useRef(new Animated.Value(points)).current
	const animatedTotalKills = useRef(new Animated.Value(total_kills)).current
	const animatedPlace = useRef(new Animated.Value(place)).current

	const [displayPoints, setDisplayPoints] = useState(points)
	const [displayTotalKills, setDisplayTotalKills] = useState(total_kills)
	const [displayPlace, setDisplayPlace] = useState(place)

	useEffect(() => {
		Animated.parallel([
			Animated.timing(animatedPoints, {
				toValue: points,
				duration: 300,
				useNativeDriver: false
			}),
			Animated.timing(animatedTotalKills, {
				toValue: total_kills,
				duration: 300,
				useNativeDriver: false
			}),
			Animated.timing(animatedPlace, {
				toValue: place,
				duration: 300,
				useNativeDriver: false
			})
		]).start()

		const pointsListener = animatedPoints.addListener(({ value }) => {
			setDisplayPoints(Math.round(value))
		})
		const totalKillsListener = animatedTotalKills.addListener(({ value }) => {
			setDisplayTotalKills(Math.round(value))
		})
		const placeListener = animatedPlace.addListener(({ value }) => {
			setDisplayPlace(Math.round(value))
		})

		return () => {
			animatedPoints.removeListener(pointsListener)
			animatedTotalKills.removeListener(totalKillsListener)
			animatedPlace.removeListener(placeListener)
		}
	}, [points, total_kills, place])

	return (
		<View style={styles.root}>
			<FlatList
				horizontal
				contentContainerStyle={styles.players}
				showsHorizontalScrollIndicator={false}
				bounces={false}
				data={players}
				keyExtractor={(item, index) => `${item.username}-${index}`}
				renderItem={({ item }) => <PlayerInfo {...item} />}
			/>
			<View style={styles.generalInformationContainer}>
				<View style={styles.textContainer}>
					<Text style={styles.text}>Points:</Text>
					<Text style={styles.textInfo}>+{displayPoints}</Text>
				</View>
				<View style={styles.textContainer}>
					<Text style={styles.text}>Место:</Text>
					<Text style={styles.textInfo}>{displayPlace}</Text>
				</View>
				<View style={styles.textContainer}>
					<Text style={styles.text}>Всего убийств:</Text>
					<Text style={styles.textInfo}>{displayTotalKills}</Text>
				</View>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	root: {
		rowGap: Gaps.g8
	},
	players: {
		columnGap: Gaps.g8
	},
	generalInformationContainer: {
		backgroundColor: Colors.playerBlack,
		paddingVertical: Paddings.p14,
		borderRadius: Radius.r4,
		paddingHorizontal: Paddings.p12,
		flexDirection: 'row',
		alignItems: 'center'
	},
	textContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		flex: 1,
		columnGap: Gaps.g8,
		justifyContent: 'center'
	},
	text: {
		color: Colors.gray,
		fontSize: Fonts.f12,
		fontFamily: Fonts.medium
	},
	textInfo: {
		color: Colors.whiteAlt,
		fontSize: Fonts.f14,
		fontFamily: Fonts.semibold
	},
})
