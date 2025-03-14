import { FC } from 'react'
import { ArrowDropListDownIcon } from '@/assets/icons/ArrowDropListDownIcon'
import { RefreshIcon } from '@/assets/icons/RefreshIcon'
import { ArrowDownIcon } from '@/assets/icons/ArrowDownIcon'
import {AlertTriangleIcon} from "@/assets/icons/AlertTriangleIcon";

export enum EIcon {
	dropListDown,
	refresh,
	arrowDown,
	alertTriangle
}

export const ICONS: Record<EIcon, FC<{ color?: string }>> = {
	[EIcon.dropListDown]: ArrowDropListDownIcon,
	[EIcon.refresh]: RefreshIcon,
	[EIcon.arrowDown]: ArrowDownIcon,
	[EIcon.alertTriangle]: AlertTriangleIcon
}
