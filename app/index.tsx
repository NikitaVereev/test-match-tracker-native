import {FlatList, StyleSheet, View} from 'react-native'
import {useMatchesQuery, useMatchesQuerySubscription} from '@/entities/matches/api/useMatchesQuery'
import {MatchCard} from '@/widget/match/MatchCard'
import {Button, DropDown, Skeleton} from '@/shared'
import {Gaps, Paddings} from '@/shared/tokens'
import {useMemo, useState} from 'react'
import {IMatch, MatchStatus} from '@/entities/matches/api/matches.interface'
import {filterMatchesByStatus} from '@/entities/matches/model/matches.helper'
import Toast from 'react-native-toast-message'
import {Icons} from "@/assets/icons/icon";
import {EIcon} from "@/assets/icons/iconConstants";

const ITEMS = [
	{ value: MatchStatus.ALL, label: 'Все статусы' },
	{ value: MatchStatus.Ongoing, label: 'Live' },
	{ value: MatchStatus.Finished, label: 'Finished' },
	{ value: MatchStatus.Scheduled, label: 'Match preparing' }
]

export default function HomeScreen() {
	const { data: matches, refetch, isLoading, isFetching, isError } = useMatchesQuery()
	useMatchesQuerySubscription()

	const [selectedStatus, setSelectedStatus] = useState<MatchStatus>(MatchStatus.ALL)

	const filteredMatches = useMemo(
		() => filterMatchesByStatus(matches, selectedStatus),
		[matches, selectedStatus]
	)

	if (isError) {
		Toast.show({
			type: 'error',
			text1: 'Ошибка: не удалось загрузить информацию'
		})
	}

	const renderItem = ({ item }: { item: IMatch }) => {
		if (isLoading || isFetching) {
			return <Skeleton style={styles.skeleton} />
		}
		return <MatchCard {...item} />
	}

	return (
		<View style={styles.matchesContainer}>
			<DropDown
				style={styles.dropDown}
				activeItem={ITEMS.find((item) => item.value === selectedStatus)?.label || 'Все статусы'}
				itemList={ITEMS}
				onSelect={(item: MatchStatus) => setSelectedStatus(item)}
			/>
			<Button text={'Обновить'} onPress={() => refetch()} isLoading={isLoading || isFetching} />
			<FlatList
				contentContainerStyle={styles.container}
				data={filteredMatches}
				showsVerticalScrollIndicator={false}
				keyExtractor={(item, index) => `${item.title}-${index}`}
				renderItem={renderItem}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	dropDown: {
		position: 'relative',
		marginBottom: Paddings.p10
	},
	skeleton: {
		height: 96
	},
	container: {
		rowGap: Gaps.g8,
		paddingVertical: Paddings.p32
	},
	matchesContainer: {
		paddingHorizontal: Paddings.p16,
		flex: 1
	}
})
