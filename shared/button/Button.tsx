import {
	Animated,
	GestureResponderEvent,
	Pressable,
	PressableProps,
	StyleSheet,
	Text
} from 'react-native'
import { Colors, Fonts, Gaps, Radius } from '../tokens'
import { Icons } from '@/assets/icons/icon'
import { EIcon } from '@/assets/icons/iconConstants'

export function Button({
	text,
	isLoading,
	...props
}: PressableProps & { text: string; isLoading?: boolean }) {
	const animatedValue = new Animated.Value(100)
	const color = animatedValue.interpolate({
		inputRange: [0, 100],
		outputRange: [Colors.redActive, Colors.red]
	})

	const fadeIn = (e: GestureResponderEvent) => {
		Animated.timing(animatedValue, {
			toValue: 0,
			duration: 100,
			useNativeDriver: true
		}).start()
		props.onPressIn && props.onPressIn(e)
	}
	const fadeOut = (e: GestureResponderEvent) => {
		Animated.timing(animatedValue, {
			toValue: 100,
			duration: 100,
			useNativeDriver: true
		}).start()
		props.onPressOut && props.onPressOut(e)
	}

	const backgroundColor = isLoading ? Colors.redDisabled : color

	return (
		<Pressable {...props} onPressIn={fadeIn} onPressOut={fadeOut} disabled={isLoading}>
			<Animated.View
				style={{
					...styles.button,
					backgroundColor: backgroundColor
				}}
			>
				<Text style={styles.text}>{text}</Text>
				<Icons name={EIcon.refresh} />
			</Animated.View>
		</Pressable>
	)
}

const styles = StyleSheet.create({
	button: {
		justifyContent: 'center',
		alignItems: 'center',
		columnGap: Gaps.g10,
		flexDirection: 'row',
		borderRadius: Radius.r4,
		height: 56
	},
	text: {
		color: Colors.white,
		fontSize: Fonts.f18,
		fontFamily: Fonts.semibold
	}
})
