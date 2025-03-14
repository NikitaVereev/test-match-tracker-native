import { FC } from 'react'
import { SafeAreaView, StyleSheet, Text } from 'react-native'
import {Colors, Fonts, Paddings} from '@/shared/tokens'

export const TopMenu: FC = () => {
	return (
		<SafeAreaView style={styles.root}>
			<Text style={styles.text}>Match Tracker</Text>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	root: {
		marginTop: Paddings.p32,
		marginBottom: Paddings.p14,
		backgroundColor: Colors.black,
		marginHorizontal: 'auto'
	},
	text: {
		fontFamily: Fonts.black,
		fontSize: Fonts.f28,
		color: Colors.white
	}
})
