import { LoginForm } from 'widgets'
import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { pageTransition } from 'utils'

const Login = () => {
	return (
		<motion.div
			initial="hidden"
			animate="visible"
			exit="exit"
			variants={pageTransition}
			className="relative w-screen h-screen flex overflow-y-auto"
		>
			<div className="flex flex-col gap-y-10 p-10 lg:p-20 mx-auto">
				<NavLink
					to="/home"
					className="w-12 outline-none border-none bg-templogo2 bg-contain bg-no-repeat h-10"
				></NavLink>
				<LoginForm />
			</div>
			<div className="hidden lg:flex lg:flex-grow lg:bg-primary p-20"></div>
		</motion.div>
	)
}

export default Login
