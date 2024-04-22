import { ComponentProps, FC } from 'react'
import { VariantProps, cva } from 'class-variance-authority'

import { cn } from '@utils'

export const badgeVariants = cva('w-fit rounded-full font-semibold', {
    variants: {
        variant: {
            success: 'border-2 border-success bg-pistachio-1 text-charcoal-black',
            warning: 'border-2 border-warning bg-warning/30 text-charcoal-black',
            error: 'border-2 border-error bg-error-100 text-charcoal-black',
        },
        size: {
            sm: 'px-2 py-1 text-sm',
            md: 'px-3 py-1 text-sm',
            lg: 'px-4 py-2 text-lg'
        }
    },
    defaultVariants: {
        variant: 'success',
        size: 'sm',
    },
})

export interface BadgeProps extends ComponentProps<'div'>, VariantProps<typeof badgeVariants> {
    text: string
}

const Badge: FC<BadgeProps> = ({ className, text, variant }) => {
    return (
        <div className={cn(badgeVariants({ className, variant }))}>
            <span className='text-sm whitespace-nowrap'>{text}</span>
        </div>
    )
}

export default Badge
