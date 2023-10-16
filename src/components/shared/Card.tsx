import { Children, FC, cloneElement, memo } from 'react'

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

const Card: FC<CardProps> = ({ children, className, fullWidth = false, ...rest }) => {
	return (
		<div
			className={cn(
				'relative h-auto m-2 border-2 border-gray-300 rounded-[10px] z-10 text-gray-800 whitespace-nowrap hover:shadow-md cursor-pointer transition-shadow duration-100 ease-in',
				fullWidth ? 'w-full' : 'max-w-[480px]',
				className,
			)}
		>
			{Children.map(children, (child) => children && cloneElement(child as any, { ...rest }))}
		</div>
	)
}

export const CardHeader: FC<CardHeaderProps> = (props) => {
	return <div className={cn('p-5', props.className)}>{props.children}</div>
}

export const CardImage: FC<CardImageProps> = (props) => {
	return <div className={cn('px-5', props.className)}>{props.children}</div>
}

export const CardBody: FC<CardBodyProps> = (props) => {
	return <div className={cn('p-5', props.className)}>{props.children}</div>
}

export const CardCTA: FC<CardCTAProps> = (props) => {
	return <div className={cn('flex justify-end p-5 mt-4 gap-x-4', props.className)}>{props.children}</div>
}

export default memo(Card)