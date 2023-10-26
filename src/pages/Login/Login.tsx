import { FormProvider, useForm } from 'react-hook-form'

import Footer from '@pages/Home/sections/Footer'
import LoginForm from './components/LoginForm'
import { LoginFormProps } from './interface/forms'
import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { pageTransition } from '@utils'
import { useTranslation } from 'react-i18next'

export default function Login() {
	const form = useForm<LoginFormProps>({
		defaultValues: {
			username: '',
			password: '',
			remeberMe: false,
		},
	})
	const { t } = useTranslation()

	return (
		<motion.div
			initial="hidden"
			animate="visible"
			exit="exit"
			variants={pageTransition}
			className="relative flex flex-col w-screen h-[calc(100vh-64px)] overflow-y-hidden"
		>
			<div className="flex h-full">
				<div className="relative flex justify-center bg-grey-100 basis-1/3">
					<div className="w-[320px] h-[320px] bg-soccer-ball bg-contain my-auto" />
					<div className="absolute top-1/2 w-full rounded-b-full h-[247px] bg-black/[.5%] backdrop-blur-[50px]" />
				</div>
				<div className="flex flex-col items-center p-10 lg:p-20 mx-auto">
					<h4 className="text-center font-bold">{t('Hi, welcome back!')}</h4>
					<FormProvider {...form}>
						<LoginForm />
					</FormProvider>
					<div className="flex gap-x-2">
						<span className="text-gray-500">{t(`Don't have an user?`)}</span>
						<NavLink
							to="/signup"
							className="font-semibold text-[15px] text-primary hover:scale-105 hover:text-gray-400/80"
						>
							{t('Sign up')}
						</NavLink>
					</div>
				</div>
			</div>
			<Footer />
		</motion.div>
	)
}
