import React from 'react'
import { Box } from '@mui/material'
import { FaArrowUp } from 'react-icons/fa'
import { Link } from 'react-scroll'

const BackButton = () => {
	return (
		<Link
			to="home"
			offset={-96}
			smooth={true}
			spy={true}
			className="fixed m-auto right-5 bottom-5 rounded-full bg-primary text-white w-[30px] h-[30px] drop-shadow-lg cursor-pointer ease-in-out duration-75 hover:scale-110"
		>
			<Box className="absolute top-[50%] left-[25%] -translate-y-[50%] w-full text-center">
				<FaArrowUp size={15} />
			</Box>
		</Link>
	)
}

export default BackButton
