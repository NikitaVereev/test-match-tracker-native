import { FC, useEffect, useRef, useState } from 'react'
import { IMatchPlayer } from '@/entities/matches/api/matches.interface'
import { Image, StyleSheet, Text, View, Animated } from 'react-native'
import { Colors, Fonts, Gaps, Paddings, Radius } from '@/shared/tokens'

export const PlayerInfo: FC<IMatchPlayer> = ({ username, kills }) => {
	const animatedKills = useRef(new Animated.Value(kills)).current

	const [displayKills, setDisplayKills] = useState(kills)

	useEffect(() => {
		Animated.timing(animatedKills, {
			toValue: kills,
			duration: 300,
			useNativeDriver: false
		}).start()

		const killsListener = animatedKills.addListener(({ value }) => {
			setDisplayKills(Math.round(value))
		})

		return () => {
			animatedKills.removeListener(killsListener)
		}
	}, [kills])

	return (
		<View style={styles.root}>
			<View style={styles.player}>
				<View style={styles.imgContainer}>
					<Image
						style={styles.img}
						resizeMode={'contain'}
						source={require('../../../../assets/app-images/avatar-global.png')}
					/>
				</View>
				<Text style={styles.textInfo}>{username}</Text>
			</View>
			<View style={styles.textContainer}>
				<Text style={styles.text}>Убийств:</Text>
				<Text style={styles.textInfo}>{displayKills}</Text>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	root: {
		backgroundColor: Colors.playerBlack,
		borderRadius: Radius.r4,
		alignItems: 'center',
		paddingHorizontal: Paddings.p12,
		paddingVertical: Paddings.p7
	},
	player: {
		columnGap: Gaps.g8,
		flexDirection: 'row',
		alignItems: 'center'
	},
	imgContainer: {
		width: 32,
		height: 32,
		alignItems: 'center',
		justifyContent: 'center'
	},
	img: {
		width: '100%',
		height: '100%'
	},
	textInfo: {
		color: Colors.whiteAlt,
		fontSize: Fonts.f14,
		fontFamily: Fonts.semibold
	},
	textContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		columnGap: Gaps.g8
	},
	text: {
		color: Colors.gray,
		fontSize: Fonts.f12,
		fontFamily: Fonts.medium
	}
})
