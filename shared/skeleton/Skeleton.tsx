import React, { FC } from 'react'
import { Animated, StyleSheet } from 'react-native'
import { Colors, Radius } from '../tokens'

interface SkeletonProps {
	width?: number | string
	height?: number | string
	borderRadius?: number | string
	style?: object
}

export const Skeleton: FC<SkeletonProps> = ({ style = {} }) => {
	const opacity = new Animated.Value(0.5)

	Animated.loop(
		Animated.timing(opacity, {
			toValue: 1,
			duration: 1000,
			useNativeDriver: true
		})
	).start()

	return <Animated.View style={[styles.skeleton, { opacity }, style]} />
}

const styles = StyleSheet.create({
	skeleton: {
		backgroundColor: Colors.cardBlackAlt,
		width: '100%',
		borderRadius: Radius.r4
	}
})
