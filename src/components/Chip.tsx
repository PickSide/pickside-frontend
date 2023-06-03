import { FC, ReactNode, useMemo, useState } from 'react'
import { twMerge } from 'tailwind-merge'

interface ChipProps {
	closable?: boolean
	disabled?: boolean
	icon?: ReactNode
	label?: string
	primary?: boolean
	secondary?: boolean
	tertiary?: boolean
}

const Chip: FC<ChipProps> = ({
	icon,
	label,
	primary = true,
	secondary = false,
	tertiary = false,
	closable = false,
	disabled = false,
}) => {
	const btnClass = useMemo(() => {
		if (disabled) return 'chip-disabled'
		if (secondary) return 'chip-secondary'
		if (tertiary) return 'chip-tertiary'
		return 'btn-primary'
	}, [disabled, secondary, tertiary])

	return (
		<div
			className={twMerge(
				'rounded-xl text-white text-[15px] ease-linear transition-all duration-75 uppercase text-sm px-2 py-1',
				btnClass,
			)}
		>
			<span>{label}</span>
		</div>
	)
}

export default Chip
