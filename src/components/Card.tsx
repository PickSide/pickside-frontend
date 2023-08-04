import { FC, cloneElement } from 'react'

import { cn } from 'utils'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
	size?: 'sm' | 'md' | 'lg'
	className?: string
	readOnly?: boolean
}

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}
interface CardImageProps extends React.HTMLAttributes<HTMLDivElement> {}
interface CardBodyProps extends React.HTMLAttributes<HTMLDivElement> {}
interface CardCTAProps extends React.HTMLAttributes<HTMLDivElement> {}

const Card: FC<CardProps> = (props) => {
	return (
		<div
			className={cn(
				'w-fit max-w-[680px] h-fit p-4 m-2 border rounded-xl text-gray-800 whitespace-nowrap',
				props.className,
			)}
		>
			{props.children}
		</div>
	)
}

export const CardHeader: FC<CardHeaderProps> = (props) => {
	return <div className={cn('w-full text-[15px] font-medium', props.className)}>{props.children}</div>
}

export const CardImage: FC<CardImageProps> = (props) => {
	return <div className={cn('min-w-[150px] min-h-[150px]', props.className)}>{props.children}</div>
}

export const CardBody: FC<CardBodyProps> = (props) => {
	return <div className={cn('w-full text-[14px]', props.className)}>{props.children}</div>
}

export const CardCTA: FC<CardCTAProps> = (props) => {
	return <div className={cn('flex justify-end gap-x-4 mx-2 my-4', props.className)}>{props.children}</div>
}

export default Card
