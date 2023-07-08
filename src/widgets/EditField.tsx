import { TextField } from 'components'
import { useState } from 'react'

const EditField = ({ value, ...rest }) => {
	return (
		<div className="relativ inline-flex">
			<TextField defaultValue={value} />
			<div></div>
		</div>
	)
}

export default EditField
