import { FormProvider, useForm } from 'react-hook-form'

import Footer from '@pages/Home/sections/Footer'
import { NavLink } from 'react-router-dom'
import SignUpForm from './components/SignUpForm'
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
			className="relative flex flex-col w-screen h-[calc(100vh-64px)] overflow-y-hidden"
		>
			<div className="flex h-full">
				<div className="relative flex justify-center bg-grey-100 basis-1/3">
					<div className="w-[320px] h-[320px] bg-soccer-ball bg-contain my-auto" />
					<div className="absolute top-1/2 w-full rounded-b-full h-[247px] bg-black/[.5%] backdrop-blur-[50px]" />
				</div>
				<div className="flex flex-col items-center p-10 lg:p-20 mx-auto">
					<h4 className="text-center font-bold">{t('Finish signing up')}</h4>
					<div className="flex gap-x-2">
						<span className="text-gray-500">{t('Already have an account?')}</span>
						<NavLink
							to="/login"
							className="font-semibold text-[15px] text-ocean hover:scale-105 hover:text-gray-400/80"
						>
							{t('Login')}
						</NavLink>
					</div>
					<FormProvider {...form}>
						<SignUpForm />
					</FormProvider>
				</div>
			</div>
			<Footer />
		</motion.div>
	)
}

export default SignUp
