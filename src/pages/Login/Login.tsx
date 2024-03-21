import { FormProvider, useForm } from 'react-hook-form'

import Footer from '@pages/Home/sections/Footer'
import LoginForm from './components/LoginForm'
import { LoginFormProps } from './interface/forms'
import { NavLink } from 'react-router-dom'
import SoccerBall from '@assets/soccer-ball.png'
import { motion } from 'framer-motion'
import { pageTransition } from '@utils'
import { useTranslation } from 'react-i18next'

export default function Login() {
	const form = useForm<LoginFormProps>({
		defaultValues: {
			username: '',
			password: '',
		},
	})
	const { t } = useTranslation()

	return (
		<motion.div
			initial="hidden"
			animate="visible"
			exit="exit"
			variants={pageTransition}
			className="flex flex-col w-screen h-[calc(100vh-64px)]"
		>
			<div className="flex-grow-2 flex">
				<div className="relative flex justify-center bg-cool-gray-0 w-1/2">
					<div className="w-[320px] h-[320px] bg-soccer-ball bg-contain my-auto">
						<img src={SoccerBall} />
					</div>
					<div className="absolute top-1/2 w-full rounded-b-full h-[247px] bg-black/[.5%] backdrop-blur-[50px]" />
				</div>
				<div className="flex flex-col justify-center w-[487px] mx-auto">
					<h4>{t('Hi, welcome back!')}</h4>
					<FormProvider {...form}>
						<LoginForm />
					</FormProvider>
					<span className="text-gray-500">
						{t(`Don't have an user?`)} &nbsp;
						<NavLink
							to="/signup"
							className="font-semibold text-[15px] text-ocean hover:scale-105 hover:text-gray-400/80"
						>
							{t('Sign up')}
						</NavLink>
					</span>
				</div>
			</div>
			<Footer />
		</motion.div>
	)
}
