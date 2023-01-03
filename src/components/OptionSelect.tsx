import React, { FC, useState } from 'react'
import { useAsync } from 'react-use'
import { MenuItem, Select, SelectProps } from '@mui/material'
import { useDispatch } from 'react-redux'

interface OptionSelectProps<T> extends SelectProps {
	callback?: Function
	options?: T[]
}

const OptionSelect: FC<OptionSelectProps<any>> = ({ callback, options, ...props }) => {
	const [fetchOptions, setFetchOptions] = useState<any>([])
	const dispatch = useDispatch()

	const { loading } = useAsync(async () => {
		if (callback) {
			const items = await dispatch<any>(callback())
			setFetchOptions(items)
		}
	}, [])

	return (
		<Select {...props}>
			{loading ? (
				<MenuItem>Loading...</MenuItem>
			) : (
				fetchOptions?.map((option, idx) => (
					<MenuItem key={idx} value={option.id}>
						{option.description}
					</MenuItem>
				))
			)}
		</Select>
	)
}

export default OptionSelect
