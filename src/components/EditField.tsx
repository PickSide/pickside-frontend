import { ReactNode, forwardRef } from 'react'
import { FiEdit2 } from 'react-icons/fi'

interface EditFieldProps {
	render?: ReactNode
	value?: string | number
	onClick?: () => void
}

const EditField = ({ render, onClick, value }: EditFieldProps, ref) => {
	return (
		<>
			<div
				className="inline-flex items-center text-[20px] group space-x-5 p-2 cursor-pointer rounded-lg"
				onClick={onClick}
			>
				<button className="outline-none text-cyan-400 ">{value}</button>
				<FiEdit2 className="group-hover:scale-110" size={20} />
			</div>
		</>
	)
}

export default forwardRef(EditField)
