import { FC } from 'react'
import { cn } from '@utils'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
	size?: 'sm' | 'md' | 'lg'
	fullWidth?: boolean
	className?: string
	readOnly?: boolean
}

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}
export interface CardImageProps extends React.HTMLAttributes<HTMLDivElement> {}
export interface CardBodyProps extends React.HTMLAttributes<HTMLDivElement> {}
export interface CardCTAProps extends React.HTMLAttributes<HTMLDivElement> {}

const Card: FC<CardProps> = (props) => {
	return (
		<div
			className={cn(
				'relative h-fit px-5 py-4 m-2 border-2 border-gray-300 rounded-xl text-gray-800 whitespace-nowrap hover:shadow-md cursor-pointer',
				props.className,
				props.fullWidth ? 'w-full' : 'max-w-[480px]',
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
	return <div className={cn('flex justify-end mt-4 gap-x-4', props.className)}>{props.children}</div>
}

export default Card
