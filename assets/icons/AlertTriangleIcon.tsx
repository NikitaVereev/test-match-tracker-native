import { FC } from 'react'
import Svg, { Path } from 'react-native-svg'

export const AlertTriangleIcon: FC = () => {
	return (
		<Svg width={28} height={28} fill="none">
			<Path
				stroke="#EB0237"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth={1.8}
				d="M14.012 11.685v2.333m0 4.667v.012m-8.166 4.655h16.333a2.334 2.334 0 0 0 2.147-3.209L16.042 5.852a2.334 2.334 0 0 0-4.083 0L3.676 20.143a2.334 2.334 0 0 0 2.041 3.209"
			/>
		</Svg>
	)
}
