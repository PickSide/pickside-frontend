import { FormProvider, useForm } from 'react-hook-form'

import Footer from '@pages/Home/sections/Footer'
import { NavLink } from 'react-router-dom'
import SignUpForm from './components/SignUpForm'
import SoccerBall from '@assets/soccer-ball.png'
import { motion } from 'framer-motion'
import { pageTransition } from '@utils'
import { useTranslation } from 'react-i18next'

const SignUp = () => {
	const form = useForm<any>({
		reValidateMode: 'onSubmit',
		resetOptions: {
			keepDirtyValues: false,
			keepErrors: false,
		},
	})
	const { t } = useTranslation()

	return (
		<motion.div
			initial="hidden"
			animate="visible"
			exit="exit"
			variants={pageTransition}
			className="flex flex-col w-screen h-[calc(100vh-64px)] overflow-hidden"
		>
			<div className="flex flex-grow-2">
				<div className="hidden relative lg:flex justify-center bg-cool-gray-0 w-1/2">
					<div className="w-[320px] h-[320px] bg-soccer-ball bg-contain my-auto">
						<img src={SoccerBall} alt="soccer_ball" />
					</div>
					<div className="absolute top-1/2 w-full rounded-b-full h-[247px] bg-black/[.5%] backdrop-blur-[50px]" />
				</div>
				<div className="flex flex-col justify-center mx-auto lg:w-[487px]">
					<h4>{t('Finish signing up')}</h4>
					<FormProvider {...form}>
						<SignUpForm />
					</FormProvider>
					<span className="text-gray-500">
						{t('Already have an account?')} &nbsp;
						<NavLink
							to="/login"
							className="font-semibold text-[15px] text-ocean hover:scale-105 hover:text-gray-400/80"
						>
							{t('Login')}
						</NavLink>
					</span>
				</div>
			</div>
			<div className="hidden lg:block">
				<Footer />
			</div>
		</motion.div>
	)
}

export default SignUp
