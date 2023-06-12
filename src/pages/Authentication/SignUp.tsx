import React from 'react'
import { NavLink } from 'react-router-dom'
import { SignUpForm } from 'widgets'
import { motion } from 'framer-motion'
import { pageTransition } from 'utils'

const SignUp = () => {
	return (
		<motion.div
			initial="hidden"
			animate="visible"
			exit="exit"
			variants={pageTransition}
			className="relative w-screen h-screen flex"
		>
			<div className="flex flex-col gap-y-10 p-20">
				<div className="inline-flex items-center">
					<NavLink
						to="/home"
						className="outline-none border-none bg-templogo2 bg-contain bg-no-repeat w-72 h-10 flex-grow"
					></NavLink>
					<NavLink
						to="/login"
						className="font-semibold text-[15px] text-primary hover:scale-105 hover:text-gray-400/80"
					>
						Login
					</NavLink>
				</div>
				<SignUpForm onClose={() => {}} />
			</div>
			<div className="flex-1 bg-primary p-20"></div>
		</motion.div>
	)
}

export default SignUp
