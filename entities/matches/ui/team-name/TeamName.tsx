import { Image, StyleSheet, Text, View } from 'react-native'
import { Colors, Fonts, Gaps } from '@/shared/tokens'
import { FC } from 'react'

interface ICommandNameProps {
	text: string
	direction?: 'ltr' | 'rtl'
}

export const TeamName: FC<ICommandNameProps> = ({ text, direction = 'ltr' }) => {
	const directionStyle = () => {
		switch (direction) {
			case 'ltr':
				return styles.left
			case 'rtl':
				return styles.right
			default:
				return styles.left
		}
	}

	return (
		<View style={{ ...styles.root, ...directionStyle() }}>
			<View style={styles.imgContainer}>
				<Image
					source={require('../../../../assets/app-images/command-logo.png')}
					resizeMode={'contain'}
					style={styles.img}
				/>
			</View>
			<Text style={styles.text}>{text}</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	root: {
		columnGap: Gaps.g6,
		alignItems: 'center'
	},
	left: {
		flexDirection: 'row'
	},
	right: {
		flexDirection: 'row-reverse'
	},
	imgContainer: {
		width: 28,
		height: 28,
		alignItems: 'center',
		justifyContent: 'center'
	},
	img: {
		width: '100%',
		height: '100%'
	},
	text: {
		color: Colors.white,
		fontSize: Fonts.f14,
		fontFamily: Fonts.semibold
	}
})
