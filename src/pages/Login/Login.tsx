import { FormProvider, useForm } from 'react-hook-form'

import LoginForm from './components/LoginForm'
import { LoginFormProps } from './interface/forms'
import { motion } from 'framer-motion'
import { pageTransition } from '@utils'

export default function Login() {
	const form = useForm<LoginFormProps>({
		defaultValues: {
			username: '',
			password: '',
			remeberMe: false,
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
				<FormProvider {...form}>
					<LoginForm />
				</FormProvider>
			</div>
			<div className="hidden lg:flex lg:flex-grow lg:bg-primary p-20"></div>
		</motion.div>
	)
}
