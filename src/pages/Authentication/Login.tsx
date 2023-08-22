import { LoginForm } from '@widgets'
import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { pageTransition } from '@utils'

const Login = () => {
	console.log(window)
	return (
		<motion.div
			initial="hidden"
			animate="visible"
			exit="exit"
			variants={pageTransition}
			className="relative w-screen h-screen flex overflow-y-auto"
		>
			<div className="flex flex-col gap-y-10 p-10 lg:p-20 mx-auto">
				<LoginForm />
			</div>
			<div className="hidden lg:flex lg:flex-grow lg:bg-primary p-20"></div>
		</motion.div>
	)
}

export default Login
