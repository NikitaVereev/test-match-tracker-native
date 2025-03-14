import Svg, { Path } from 'react-native-svg'
import { FC } from 'react'

export const ArrowDownIcon: FC<{ color?: string }> = ({ color }) => {
	return (
		<Svg width={20} height={20} fill="none">
			<Path
				fill={color ? color : '#B4B5B6'}
				d="M14.932 6.816H5.065c-.8 0-1.2.966-.633 1.533l4.317 4.317a1.775 1.775 0 0 0 2.508 0l1.642-1.642 2.675-2.675c.558-.567.158-1.533-.642-1.533Z"
			/>
		</Svg>
	)
}
