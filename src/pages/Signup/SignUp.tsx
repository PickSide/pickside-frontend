import { FormProvider, useForm } from 'react-hook-form'

import { NavLink } from 'react-router-dom'
import SignUpForm from './components/SignUpForm'
import { motion } from 'framer-motion'
import { pageTransition } from '@utils'

const SignUp = () => {
	const form = useForm<any>({
		reValidateMode: 'onSubmit',
		resetOptions: {
			keepDirtyValues: false,
			keepErrors: false,
		},
	})
	return (
		<motion.div
			initial="hidden"
			animate="visible"
			exit="exit"
			variants={pageTransition}
			className="relative w-screen h-screen flex overflow-y-auto"
		>
			<div className="flex flex-col gap-y-10 p-10 lg:p-20 mx-auto">
				<div className="inline-flex items-center">
					<NavLink
						to="/login"
						className="font-semibold text-[15px] text-primary hover:scale-105 hover:text-gray-400/80"
					>
						Login
					</NavLink>
				</div>
				<FormProvider {...form}>
					<SignUpForm />
				</FormProvider>
			</div>
			<div className="hidden lg:flex lg:flex-grow lg:bg-primary p-20"></div>
		</motion.div>
	)
}

export default SignUp
