import { ComponentProps, FC, ReactNode } from 'react'
import { VariantProps, cva } from 'class-variance-authority'

import { cn } from '@utils'

export const avatarVariants = cva(
	['relative', 'inline-flex', 'items-center', 'justify-center', 'rounded-full', 'text-base', 'overflow-clip'],
	{
		variants: {
			variant: {
				primary: [
					'text-ocean',
					'border-duck-3',
					'border-2',
					'bg-cool-gray-1',
					'dark:bg-grey-600',
					'dark:text-white',
					'dark:hover:bg-gray-300',
				],
				secondary: ['text-white', 'bg-ocean', 'dark:bg-grey-600', 'dark:text-white', 'dark:hover:bg-gray-300'],
			},
			size: {
				sm: ['w-7 h-7'],
				md: ['w-8 h-8'],
				lg: ['w-12 h-12'],
				xlg: ['w-14 h-14'],
				xxlg: ['w-40 h-40'],
			},
		},
		defaultVariants: {
			variant: 'primary',
			size: 'md',
		},
	},
)

export interface AvatarProps extends ComponentProps<'img'>, VariantProps<typeof avatarVariants> {
	badge?: ReactNode
}

const Avatar: FC<AvatarProps> = ({ badge, className, size, variant, src = null }) => {
	return (
		<div className={cn(avatarVariants({ className, size, variant }), className)}>
			{src ? (
				<img className="max-w-full h-auto rounded-full" src={src} alt="user-avatar" />
			) : (
				<svg width={16} height={16} viewBox="0 0 24 24" fill="primary" xmlns="http://www.w3.org/2000/svg">
					<path
						fillRule="evenodd"
						clipRule="evenodd"
						d="M4.49579 23.3299C4.45167 23.7418 4.08202 24.0399 3.67016 23.9957C3.25831 23.9516 2.9602 23.582 3.00433 23.1701C3.50157 18.5292 7.32488 15 12.0001 15C16.6752 15 20.4986 18.5292 20.9958 23.1701C21.0399 23.582 20.7418 23.9516 20.33 23.9957C19.9181 24.0399 19.5485 23.7418 19.5043 23.3299C19.0878 19.4427 15.8999 16.5 12.0001 16.5C8.10025 16.5 4.91228 19.4427 4.49579 23.3299ZM12.0001 13.5C8.68635 13.5 6.00006 10.8137 6.00006 7.5C6.00006 4.18629 8.68635 1.5 12.0001 1.5C15.3138 1.5 18.0001 4.18629 18.0001 7.5C18.0001 10.8137 15.3138 13.5 12.0001 13.5ZM12.0001 12C14.4853 12 16.5001 9.98528 16.5001 7.5C16.5001 5.01472 14.4853 3 12.0001 3C9.51478 3 7.50006 5.01472 7.50006 7.5C7.50006 9.98528 9.51478 12 12.0001 12Z"
						fill="currentColor"
						strokeWidth={1}
					/>
				</svg>
			)}
			<div className="absolute top-0 -right-1">{badge}</div>
		</div>
	)
}

export default Avatar
