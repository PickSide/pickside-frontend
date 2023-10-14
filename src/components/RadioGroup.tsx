import { Children, ComponentPropsWithRef, cloneElement, forwardRef } from 'react'

interface RadioGroupProps extends ComponentPropsWithRef<'fieldset'> {
	name?: string
}

const RadioGroup = forwardRef<HTMLFieldSetElement, RadioGroupProps>(
	({ children, label, ...rest }: RadioGroupProps | any, ref) => (
		<fieldset className="block space-y-[20px]" {...rest}>
			{Children.map(children, (child) => cloneElement(child, { ...rest }))}
		</fieldset>
	),
)

export default RadioGroup
