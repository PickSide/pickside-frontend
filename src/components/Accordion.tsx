import React, { ReactElement, ReactNode, forwardRef, useState } from 'react'
import { MdExpandLess, MdExpandMore } from 'react-icons/md'

interface Section {
	title: string
	icon: any
	expanded?: boolean
	content?: ReactNode
}

interface AccordionProps {
	sections: Section[]
}

const Accordion = ({ sections }: AccordionProps, ref) => {
	const [accordion, setAccordion] = useState<Section[]>(sections)

	const handleExpand = (idx, newValue) => {
		const newState = accordion
		newState[idx].expanded = newValue
		setAccordion([...newState])
	}

	return (
		<div className="flex flex-col outline-slate-300 gap-y-4 peer:ease-in-out peer:transition-all peer:duration-150">
			{accordion?.map(({ content, title, expanded = false, icon }, idx) => (
				<div className=" p-4 shadow-md rounded-md " key={idx}>
					<div className="flex min-w-[200px] justify-between items-center">
						<div className="flex items-center space-x-3">
							{icon}
							<p className="text-[20px] font-semibold">{title}</p>
						</div>
						<div className="inline-flex items-center">
							<button className="rounded-full hover:bg-gray-200" onClick={() => handleExpand(idx, !expanded)}>
								{expanded ? <MdExpandLess size={25} /> : <MdExpandMore size={25} />}
							</button>
						</div>
					</div>
					{expanded && <div className="h-fit p-4">{content}</div>}
				</div>
			))}
		</div>
	)
}

export default forwardRef(Accordion)
