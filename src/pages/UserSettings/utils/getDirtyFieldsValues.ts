import { FormState } from 'react-hook-form'

export default function getDirtyFieldsValues(values, formState: FormState<any>) {
	const keys = Object.keys(formState.dirtyFields)
	const changes = {}
	keys.forEach((key) => (changes[key] = values[key]))
	return changes
}
