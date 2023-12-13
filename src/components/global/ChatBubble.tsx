import { ComponentProps, FC } from 'react'

import { cn } from '@utils'

interface ChatBubbleProps extends ComponentProps<'div'> {
	type?: 'receive' | 'sent' | any
	message?: any
}

const ChatBubble: FC<ChatBubbleProps> = ({ children, type = 'receive' }) => {
	return (
		<div className={cn('w-full p-1 inline-flex', type === 'receive' ? 'justify-start' : 'justify-end')}>
			<span
				className={cn(
					'w-fit px-2 py-1 rounded-lg m-1 flex text-sm max-w-[80%] whitespace-normal',
					type === 'receive' ? 'bg-cool-gray-1 text-dark' : 'bg-primary text-white',
				)}
			>
				{children}
			</span>
			<p></p>
		</div>
	)
}

export default ChatBubble
