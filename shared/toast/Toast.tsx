import { FC } from 'react'
import RnToast, { BaseToastProps } from 'react-native-toast-message'
import { StyleSheet, Text, View, ViewStyle } from 'react-native'
import { Colors, Fonts, Gaps, Paddings, Radius } from '@/shared/tokens'
import { Icons } from '@/assets/icons/icon'
import { EIcon } from '@/assets/icons/iconConstants'

const options = (): Partial<BaseToastProps> => ({
	style: {
		backgroundColor: Colors.cardBlackAlt,
		borderLeftWidth: 0,
		paddingVertical: Paddings.p8,
		paddingHorizontal: Paddings.p12,
		columnGap: Gaps.g10,
		flexDirection: 'row',
		borderRadius: Radius.r4,
		alignItems: 'center',
		justifyContent: 'center'
	} as ViewStyle
})

export const Toast: FC = () => {
	return (
		<RnToast
			topOffset={47}
			config={{
				success: ({ text1 }) => (
					<View {...options()}>
						<Text style={styles.text}>{text1}</Text>
					</View>
				),
				error: ({ text1 }) => (
					<View {...options()}>
						<Icons name={EIcon.alertTriangle} />
						<Text style={styles.text}>{text1}</Text>
					</View>
				)
			}}
		/>
	)
}

const styles = StyleSheet.create({
	text: {
		color: Colors.white,
		fontSize: Fonts.f12,
		fontFamily: Fonts.medium
	}
})
