import React, { ReactElement, forwardRef, useEffect, useState, useRef, ReactNode } from 'react'
import { useSize } from 'react-use'
import { MdExpandLess, MdExpandMore } from 'react-icons/md'

interface AccordionSectionProps {
	title: string
	icon: any
	expanded?: boolean
	children?: ReactNode
}

interface AccordionProps {
	children?: ReactNode
}

const Accordion = ({ children }: AccordionProps, ref) => {
	return (
		<div className="flex flex-col outline-slate-300 gap-y-4 peer:ease-in-out peer:transition-all peer:duration-150">
			{children}
		</div>
	)
}

export const AccordionSection = ({ children, title, expanded = false, icon }: AccordionSectionProps) => {
	const [expand, setExpand] = useState<boolean>(expanded)

	return (
		<div className=" p-4 shadow-md rounded-md">
			<div className="flex min-w-[200px] justify-between items-center">
				<div
					className="flex flex-grow items-center space-x-3 cursor-pointer"
					onClick={() => setExpand((prev) => !prev)}
				>
					{icon}
					<p className="text-[20px] font-semibold">{title}</p>
				</div>
				<div className="inline-flex items-center">
					<button type="button" className="rounded-full hover:bg-gray-200" onClick={() => setExpand((prev) => !prev)}>
						{expand ? <MdExpandLess size={25} /> : <MdExpandMore size={25} />}
					</button>
				</div>
			</div>
			{expand && <div className="h-fit p-4">{children}</div>}
		</div>
	)
}

export default forwardRef(Accordion)
