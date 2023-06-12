import { NavLink } from 'react-router-dom'
import { LoginForm } from 'widgets'
import { BiArrowBack } from 'react-icons/bi'
import { motion } from 'framer-motion'
import { pageTransition } from 'utils'

const Login = () => {
	return (
		<motion.div
			initial="hidden"
			animate="visible"
			exit="exit"
			variants={pageTransition}
			className="relative w-screen h-screen flex"
		>
			<div className="flex flex-col gap-y-10 p-20 m-auto">
				<NavLink
					to="/home"
					className="w-12 outline-none border-none bg-templogo2 bg-contain bg-no-repeat h-10"
				></NavLink>
				<LoginForm onClose={() => {}} />
			</div>
			<div className="flex-1 bg-primary p-20"></div>
		</motion.div>
	)
}

export default Login
