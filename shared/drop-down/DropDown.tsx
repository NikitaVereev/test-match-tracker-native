import { Animated, Pressable, PressableProps, StyleSheet, Text, View } from 'react-native'
import { Icons } from '@/assets/icons/icon'
import { EIcon } from '@/assets/icons/iconConstants'
import { Colors, Fonts, Paddings, Radius } from '@/shared/tokens'
import { useRef, useState } from 'react'

type DropDownItem = {
	value: string
	label: string
}

export function DropDown({
	activeItem,
	itemList,
	isLoading,
	onSelect,
	...props
}: PressableProps & {
	activeItem: string
	itemList: DropDownItem[]
	isLoading?: boolean
	onSelect: (item: string) => void
}) {
	const [isOpen, setIsOpen] = useState(false)
	const animatedHeight = useRef(new Animated.Value(0)).current
	const animatedOpacity = useRef(new Animated.Value(0)).current
	const animatedText = useRef(new Animated.Value(0)).current
	const rotateAnim = useRef(new Animated.Value(0)).current

	const toggle = () => {
		setIsOpen(!isOpen)

		Animated.timing(animatedHeight, {
			toValue: isOpen ? 0 : 300,
			duration: 300,
			useNativeDriver: false
		}).start()

		Animated.timing(animatedText, {
			toValue: isOpen ? 0 : 1,
			duration: 200,
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

	const textColorInterpolate = animatedText.interpolate({
		inputRange: [0, 1],
		outputRange: [Colors.grayAlt, Colors.white]
	})

	const handleSelect = (item: DropDownItem) => {
		onSelect(item.value)
		toggle()
	}

	return (
		<View style={{ ...styles.root, ...props.style }}>
			<Pressable onPress={toggle} style={styles.button}>
				<Animated.Text style={[styles.text, { color: textColorInterpolate }]}>
					{activeItem}
				</Animated.Text>
				<Animated.View style={{ transform: [{ rotate: rotateInterpolate }] }}>
					<Icons name={EIcon.arrowDown} color={isOpen ? Colors.white : Colors.grayAlt} />
				</Animated.View>
			</Pressable>
			<Animated.View style={[styles.list, { maxHeight: animatedHeight, opacity: animatedOpacity }]}>
				{itemList.map((item) => (
					<Pressable key={item.value} style={styles.item} onPress={() => handleSelect(item)}>
						<Text style={styles.itemText}>{item.label}</Text>
					</Pressable>
				))}
			</Animated.View>
		</View>
	)
}

const styles = StyleSheet.create({
	root: {
		position: 'relative'
	},
	list: {
		paddingVertical: Paddings.p6,
		backgroundColor: Colors.cardBlackAlt,
		borderRadius: Radius.r4,
		position: 'absolute',
		zIndex: 1,
		top: 56 + Paddings.p8,
		width: '100%'
	},
	item: {
		padding: Paddings.p12
	},
	button: {
		flexDirection: 'row',
		position: 'relative',
		alignItems: 'center',
		height: 56,
		justifyContent: 'space-between',
		paddingHorizontal: Paddings.p16,
		borderRadius: Radius.r4,
		backgroundColor: Colors.cardBlack
	},
	text: {
		fontSize: Fonts.f16,
		fontFamily: Fonts.medium
	},
	itemText: {
		fontSize: Fonts.f16,
		color: Colors.grayAlt,
		fontFamily: Fonts.medium
	}
})
