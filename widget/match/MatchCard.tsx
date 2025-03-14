import { FC, useState, useRef } from 'react'
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native'
import { IMatch } from '@/entities/matches/api/matches.interface'
import { TeamName } from '@/entities/matches/ui/team-name/TeamName'
import { Score } from '@/entities/matches/ui/score/Score'
import { TeamInfo } from '@/entities/matches/ui/team-info/TeamInfo'
import { Colors, Fonts, Gaps, Paddings, Radius } from '@/shared/tokens'
import { Icons } from '@/assets/icons/icon'
import { EIcon } from '@/assets/icons/iconConstants'

export const MatchCard: FC<IMatch> = (props) => {
	const { homeTeam, homeScore, awayScore, awayTeam, status } = props

	const [isOpen, setIsOpen] = useState(false)
	const animatedHeight = useRef(new Animated.Value(0)).current
	const animatedOpacity = useRef(new Animated.Value(0)).current
	const rotateAnim = useRef(new Animated.Value(0)).current

	const toggleInfo = () => {
		setIsOpen(!isOpen)

		Animated.timing(animatedHeight, {
			toValue: isOpen ? 0 : 300,
			duration: 300,
			useNativeDriver: false
		}).start()

		Animated.timing(animatedOpacity, {
			toValue: isOpen ? 0 : 1,
			duration: 300,
			useNativeDriver: false
		}).start()

		Animated.timing(rotateAnim, {
			toValue: isOpen ? 0 : 180,
			duration: 300,
			useNativeDriver: true
		}).start()
	}

	const rotateInterpolate = rotateAnim.interpolate({
		inputRange: [0, 180],
		outputRange: ['0deg', '180deg']
	})

	return (
		<View style={styles.root}>
			<View style={styles.container}>
				<TeamName text={homeTeam.name} direction={'ltr'} />
				<Score homeScore={homeScore} awayScore={awayScore} status={status} />
				<TeamName text={awayTeam.name} direction={'rtl'} />
			</View>

			<Animated.View
				style={[styles.dropListItem, { maxHeight: animatedHeight, opacity: animatedOpacity }]}
			>
				{isOpen && (
					<View style={styles.infoContainer}>
						<TeamInfo {...homeTeam} />
						<View style={styles.separator}>
							<View style={styles.separatorLine} />
							<Text style={styles.separatorText}>VS</Text>
							<View style={styles.separatorLine} />
						</View>
						<TeamInfo {...awayTeam} />
					</View>
				)}
			</Animated.View>

			<Pressable onPress={toggleInfo} style={styles.dropListDown}>
				<Animated.View style={{ transform: [{ rotate: rotateInterpolate }] }}>
					<Icons name={EIcon.dropListDown} />
				</Animated.View>
			</Pressable>
		</View>
	)
}

const styles = StyleSheet.create({
	root: {
		backgroundColor: Colors.cardBlack,
		padding: Paddings.p8,
		borderRadius: Radius.r4
	},
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	dropListDown: {
		width: 28,
		height: 28,
		marginTop: Paddings.p8,
		alignItems: 'center',
		justifyContent: 'center',
		marginHorizontal: 'auto'
	},
	dropListItem: {
		overflow: 'hidden'
	},
	infoContainer: {
		rowGap: Gaps.g8,
		marginTop: Paddings.p8
	},
	separator: {
		flexDirection: 'row',
		alignItems: 'center',
		columnGap: Gaps.g10,
		height: 21
	},
	separatorLine: {
		flex: 1,
		height: 1,
		backgroundColor: Colors.blackLight
	},
	separatorText: {
		color: Colors.translucentBlue,
		fontSize: Fonts.f14,
		fontFamily: Fonts.semibold
	}
})
