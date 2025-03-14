import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import { useEffect } from 'react'
import 'react-native-reanimated'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { TopMenu } from '@/entities/layout/ui/top-menu/TopMenu'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Colors } from '@/shared/tokens'
import {Toast} from "@/shared";

SplashScreen.preventAutoHideAsync()

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false
		}
	}
})

export default function RootLayout() {
	const [loaded] = useFonts({
		TacticSans: require('../assets/fonts/tactic-sans/TacticSans-BlkIt.ttf'),
		InterMedium: require('../assets/fonts/inter/Inter-Medium.ttf'),
		InterSemiBold: require('../assets/fonts/inter/Inter-SemiBold.ttf')
	})

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync()
		}
	}, [loaded])

	if (!loaded) {
		return null
	}

	return (
		<QueryClientProvider client={queryClient}>
			<SafeAreaProvider>
				<Stack
					screenOptions={{
						contentStyle: {
							backgroundColor: Colors.black
						}
					}}
				>
					<Stack.Screen name="+not-found" />
					<Stack.Screen name={'index'} options={{ header: () => <TopMenu /> }} />
				</Stack>
				<Toast />
				<StatusBar style="auto" />
			</SafeAreaProvider>
		</QueryClientProvider>
	)
}
