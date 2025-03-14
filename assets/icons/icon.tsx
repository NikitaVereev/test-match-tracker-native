import { EIcon, ICONS } from './iconConstants.ts'

interface IIconProps {
	name: EIcon
	color?: string
}

export function Icons(props: IIconProps) {
	const { name } = props
	const ChosenIcon = ICONS[name]
	return <ChosenIcon />
}
