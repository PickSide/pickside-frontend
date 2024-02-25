import { ComponentPropsWithRef, forwardRef } from 'react'
import { VariantProps, cva } from 'class-variance-authority'

import UploadPlaceholder from '@assets/upload-placeholder.svg'
import { cn } from '@utils'

export const ImageVariants = cva(
    'rounded-md bg-cool-gray-1/70 border-2 border-cool-gray-2 text-cool-gray-2',
    {
        variants: {
            size: {
                sm: 'w-[200px] h-[100px]',
                md: 'w-[300px] h-[200px]',
                lg: 'w-[400px] h-[300px]',
            },
        },
        defaultVariants: {
            size: 'md',
        },
    },
)

export type ImageProps = ComponentPropsWithRef<'img'> & VariantProps<typeof ImageVariants>

const Image = forwardRef<any, ImageProps>(
    ({ children, className, size, ...rest }, ref) => {
        return (
            <img
                ref={ref}
                src={UploadPlaceholder}
                className={cn(ImageVariants({ className, size }), className)}
                alt='placeholder'
                {...rest}
            />
        )
    },
)

export default Image
