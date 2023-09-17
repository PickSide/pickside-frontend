import InputField, { InputFieldProps } from './shared/InputField'

import { forwardRef } from 'react'

const NumberField = (props: InputFieldProps, ref) => {
	const onFocus = (e) => e.target.select()

	return <InputField onFocus={onFocus} type="number" ref={ref} {...props} />
}

export default forwardRef(NumberField)
