import { useNavigate } from 'react-router-dom'
import { LoginForm } from 'widgets'
import { BiArrowBack } from 'react-icons/bi'
import { motion } from 'framer-motion'
import { pageTransition } from 'utils'

const Login = () => {
	const navigate = useNavigate()

	return (
		<motion.div
			initial="hidden"
			animate="visible"
			exit="exit"
			variants={pageTransition}
			className="relative w-screen h-screen flex"
		>
			<div className="flex-1 p-20 m-auto">
				<LoginForm onClose={() => {}} />
			</div>
			<div className="flex-1 bg-primary p-20"></div>
			<div
				onClick={() => navigate('/')}
				className="absolute top-5 left-5 flex gap-x-3 text-secondary cursor-pointer ease-in hover:text-slate-500 hover:scale-110 duration-[30] transition-all"
			>
				<BiArrowBack size={25} />
				<span>Home</span>
			</div>
		</motion.div>
	)
}

export default Login
